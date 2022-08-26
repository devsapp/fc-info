import _ from 'lodash';
import { ServiceConfig, MountPoint } from './interface/fc-service';
import { FunctionConfig, CustomContainerConfig } from './interface/fc-function';
import { TriggerConfig } from './interface/fc-trigger';
import logger from '../common/logger';
import { ENABLE_EB_TRIGGER_HEADER } from './static';

export default class FcInfo {
  region: string;
  serviceName: string;
  functionName?: any;
  triggerNames?: any;

  private fcClient: any;

  constructor(fcClient, region) {
    this.region = region;
    this.fcClient = fcClient;
  }

  private async infoService(serviceName: string, infoType?: boolean): Promise<ServiceConfig> {
    const { data } = await this.fcClient.getService(serviceName);
    const vpcBinding = await this.getVpcBinding(serviceName);
    if (infoType) {
      data.name = data.serviceName;
      data.vpcBinding = vpcBinding;
      return data;
    }
    logger.debug(`getService data: \n${JSON.stringify(data, null, '  ')}`);
    const { description, role, logConfig, vpcConfig, nasConfig, internetAccess } = data;
    const serviceConfig: ServiceConfig = {
      name: serviceName,
      internetAccess,
      vpcBinding,
    };

    if (role) {
      serviceConfig.role = role;
    }

    if (description) {
      serviceConfig.description = description;
    }

    if (vpcConfig && vpcConfig.vpcId) {
      serviceConfig.vpcConfig = {
        securityGroupId: vpcConfig.securityGroupId,
        vswitchIds: vpcConfig.vSwitchIds,
        vpcId: vpcConfig.vpcId,
      };
    }
    if (nasConfig && nasConfig.mountPoints.length > 0) {
      const handlerDir = ({ serverAddr, mountDir }) => {
        const subscript: number = serverAddr.indexOf(':/');
        const itemConfig: MountPoint = {
          serverAddr: serverAddr.substr(0, subscript),
          nasDir: serverAddr.substr(subscript + 1),
          fcDir: mountDir,
        };
        return itemConfig;
      };

      serviceConfig.nasConfig = {
        userId: nasConfig.userId,
        groupId: nasConfig.groupId,
        mountPoints: nasConfig.mountPoints.map((item) => handlerDir(item)),
      };
    }

    if (logConfig && logConfig.logstore) {
      serviceConfig.logConfig = {
        logstore: logConfig.logstore,
        project: logConfig.project,
      };
    }
    return serviceConfig;
  }

  private async infoFunction(serviceName: string, functionName: string, infoType?: boolean): Promise<FunctionConfig> {
    const { data } = await this.fcClient.getFunction(serviceName, functionName);
    const asyncConfig = await this.getFunctionAsyncConfig(serviceName, functionName);

    if (infoType) {
      data.name = data.functionName;
      data.asyncConfiguration = asyncConfig;
      return data;
    }
    logger.debug(`getFunction data: \n${JSON.stringify(data, null, '  ')}`);
    const {
      description,
      runtime,
      handler,
      timeout,
      initializer,
      initializationTimeout,
      memorySize,
      gpuMemorySize,
      environmentVariables,
      instanceConcurrency,
      customContainerConfig,
      caPort,
      instanceType,
      customDNS,
      layers,
      customRuntimeConfig,
    } = data;

    let customContainer: CustomContainerConfig;
    if (customContainerConfig) {
      // 目前支持这三个属性
      customContainer = {
        image: customContainerConfig.image,
        command: customContainerConfig.command,
        args: customContainerConfig.args,
        instanceID: customContainerConfig?.instanceID,
        accelerationType: customContainerConfig?.accelerationType,
      };
    }

    const functionConfig: FunctionConfig = {
      name: functionName,
      runtime,
      handler,
      timeout,
      instanceType,
      memorySize,
      gpuMemorySize: instanceType === 'g1' ? gpuMemorySize : undefined,
    };

    if (description) {
      functionConfig.description = description;
    }
    if (initializer) {
      functionConfig.initializer = initializer;
    }
    if (initializationTimeout) {
      functionConfig.initializationTimeout = initializationTimeout;
    }
    if (instanceConcurrency) {
      functionConfig.instanceConcurrency = instanceConcurrency;
    }
    if (customContainer) {
      functionConfig.customContainerConfig = customContainer;
    }
    if (caPort) {
      functionConfig.caPort = caPort;
    }
    if (runtime === 'custom' && !_.isEmpty(customRuntimeConfig?.command)) {
      functionConfig.customRuntimeConfig = customRuntimeConfig;
    }
    if (!_.isNil(customDNS)) {
      functionConfig.customDNS = customDNS;
    }
    if (!_.isEmpty(layers)) {
      functionConfig.layers = layers;
    }
    if (!_.isNil(asyncConfig)) {
      functionConfig.asyncConfiguration = asyncConfig;
    }

    if (!_.isEmpty(environmentVariables)) {
      functionConfig.environmentVariables = environmentVariables;
    }
    return functionConfig;
  }

  private async infoTrigger(serviceName: string, functionName: string, triggerName: string, infoType: boolean, triggerData?): Promise<TriggerConfig> {
    let data = triggerData;
    if (_.isEmpty(triggerData)) {
      data = (await this.fcClient.getTrigger(serviceName, functionName, triggerName, ENABLE_EB_TRIGGER_HEADER)).data;
    }
    if (infoType) {
      data.name = data.triggerName;
      return data;
    }
    logger.debug(`getTrigger data: \n${JSON.stringify(data, null, '  ')}`);
    const { triggerConfig, qualifier, triggerType, sourceArn, invocationRole } = data;
    let type: string = triggerType.toLocaleLowerCase();
    let config: any;
    switch (type) {
      case 'http':
        config = {
          qualifier,
          authType: triggerConfig.authType,
          methods: triggerConfig.methods,
        };
        break;
      case 'oss':
        config = {
          qualifier,
          bucketName: sourceArn.split(':').pop(),
          events: triggerConfig.events,
          filter: {
            Key: {
              Prefix: triggerConfig.filter.key.prefix,
              Suffix: triggerConfig.filter.key.suffix,
            },
          },
        };
        break;
      case 'timer':
        config = {
          qualifier,
          cronExpression: triggerConfig.cronExpression,
          enable: triggerConfig.enable,
          payload: triggerConfig.payload,
        };
        break;
      case 'cdn_events':
        type = 'cdnEvents';
        config = {
          qualifier,
          eventName: triggerConfig.eventName,
          eventVersion: triggerConfig.eventVersion,
          notes: triggerConfig.notes,
          filter: {
            domain: triggerConfig.filter.domain,
          },
        };
        break;
      case 'log':
        config = {
          qualifier,
          sourceConfig: {
            logStore: triggerConfig.sourceConfig.logstore,
          },
          jobConfig: {
            maxRetryTime: triggerConfig.jobConfig.maxRetryTime,
            triggerInterval: triggerConfig.jobConfig.triggerInterval,
          },
          logConfig: {
            logStore: triggerConfig.logConfig.logstore,
            project: triggerConfig.logConfig.project,
          },
          // triggerConfig: triggerConfig.triggerConfig,
          functionParameter: triggerConfig.functionParameter,
          enable: triggerConfig.enable,
        };
        if (!_.isEmpty(triggerConfig?.targetConfig)) {
          config.targetConfig = triggerConfig.targetConfig;
        }
        break;
      case 'mns_topic': {
        const arnConfig = sourceArn.split(':');
        type = 'mnsTopic';
        config = {
          qualifier,
          filterTag: triggerConfig.filterTag,
          notifyStrategy: triggerConfig.notifyStrategy,
          notifyContentFormat: triggerConfig.notifyContentFormat,
          region: arnConfig[2],
          topicName: arnConfig.pop().split('/').pop(),
        };
        break;
      }
      case 'tablestore': {
        const arnOtsConfig = sourceArn.split(':').pop().split('/');
        type = 'TableStore';
        config = {
          qualifier,
          tableName: arnOtsConfig[3],
          instanceName: arnOtsConfig[1],
        };
        break;
      }
      case 'eventbridge': {
        config = triggerConfig;
        const eventSourceType = triggerConfig.eventSourceConfig?.eventSourceType;
        const deleteKeys = {
          RocketMQ: ['sourceMNSParameters', 'sourceRabbitMQParameters', 'sourceKafkaParameters'],
          Default: ['eventSourceConfig'],
          MNS: ['sourceRabbitMQParameters', 'sourceKafkaParameters', 'sourceRocketMQParameters'],
          RabbitMQ: ['sourceMNSParameters', 'sourceKafkaParameters', 'sourceRocketMQParameters'],
          Kafka: ['sourceMNSParameters', 'sourceRabbitMQParameters', 'sourceRocketMQParameters'],
        };

        const needDeleteKeys = deleteKeys[eventSourceType];
        if (needDeleteKeys) {
          for (const needDeleteKey of needDeleteKeys) {
            delete config.eventSourceConfig?.eventSourceParameters?.[needDeleteKey];
          }
        }
        break;
      }
      default:
        logger.error(`No trigger type matching ${type}`);
    }
    const trigger: TriggerConfig = {
      name: triggerName,
      type: triggerType.toLocaleLowerCase(),
      config,
    };

    if (invocationRole) {
      trigger.role = invocationRole;
    }
    if (sourceArn) {
      trigger.sourceArn = sourceArn;
    }
    if (data.urlInternet) {
      trigger.urlInternet = data.urlInternet;
    }

    return trigger;
  }

  private async getVpcBinding(serviceName: string) {
    try {
      const { data } = await this.fcClient._listVpcbinding(serviceName);
      const vpcIds = _.get(data, 'vpcIds');
      if (!_.isEmpty(vpcIds)) {
        return vpcIds;
      }
    } catch (ex) {
      logger.debug(`getVpcBinding error code ${ex?.code}, error message: ${ex.message}`);
    }
  }

  private async getFunctionAsyncConfig(serviceName, functionName) {
    try {
      const { data } = await this.fcClient.getFunctionAsyncConfig(serviceName, functionName, 'LATEST');

      return {
        destinationConfig: data.destinationConfig,
        maxAsyncEventAgeInSeconds: data.maxAsyncEventAgeInSeconds,
        statefulInvocation: data.statefulInvocation,
        maxAsyncRetryAttempts: data.maxAsyncRetryAttempts,
      };
    } catch (ex) {
      logger.debug(`getFunctionAsyncConfig error code ${ex?.code}, error message: ${ex.message}`);
    }
  }


  private async listTriggers(serviceName: string, functionName: string) {
    return (await this.fcClient.listTriggers(serviceName, functionName, undefined, ENABLE_EB_TRIGGER_HEADER)).data?.triggers || [];
  }

  private async infoDomain(domainName: string, infoType: boolean) {
    const { data } = await this.fcClient.getCustomDomain(domainName);
    if (infoType) {
      return data;
    }
    const res: any = {
      domainName: data.domainName,
      protocol: data.protocol,
      routeConfigs: data.routeConfig.routes.map((item) => {
        const route: any = {
          path: item.path,
          serviceName: item.serviceName,
          functionName: item.functionName,
          qualifier: item.qualifier,
        };

        return route;
      }),
    };
    if (data.protocol === 'HTTP,HTTPS') {
      res.certConfig = data.certConfig;
      res.tlsConfig = data.tlsConfig;
    }
    return res;
  }

  async info(serviceName: string, functionName?: string, triggerNames?: string[], domainNames?: string[], infoType?: boolean): Promise<any> {
    const serviceInfo: any = await this.infoService(serviceName, infoType);
    const info: any = {
      region: this.region,
      service: serviceInfo,
    };
    if (functionName) {
      Object.assign(info, {
        function: await this.infoFunction(serviceName, functionName, infoType),
      });
    }
    if (!_.isEmpty(triggerNames)) {
      Object.assign(info, { triggers: [] });
      for (const triggerName of triggerNames) {
        info.triggers.push(await this.infoTrigger(serviceName, functionName, triggerName, infoType, undefined));
      }
    } else if (functionName && !infoType) {
      const listTriggers = await this.listTriggers(serviceName, functionName);
      if (!_.isEmpty(listTriggers)) {
        Object.assign(info, { triggers: [] });
        for (const triggerConfig of listTriggers) {
          const { triggerName } = triggerConfig;
          info.triggers.push(await this.infoTrigger(serviceName, functionName, triggerName, infoType, triggerConfig));
        }
      }
    }

    if (!_.isEmpty(domainNames)) {
      Object.assign(info, { customDomains: [] });
      for (const domainName of domainNames) {
        info.customDomains.push(await this.infoDomain(domainName, infoType));
      }
    }

    return info;
  }
}
