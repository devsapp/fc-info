import * as _ from 'lodash';
import { ServiceConfig, MountPoint } from './interface/fc-service';
import { FunctionConfig, CustomContainerConfig } from './interface/fc-function';
import { TriggerConfig } from './interface/fc-trigger';
import logger from '../common/logger';

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

  private async infoService(serviceName: string, infoType?: string): Promise<ServiceConfig> {
    const { data } = await this.fcClient.getService(serviceName);
    if (infoType) {
      data.name = data.serviceName;
      return data;
    }
    logger.debug(`getService data: \n${JSON.stringify(data, null, '  ')}`);
    const { description, role, logConfig, vpcConfig, nasConfig, internetAccess } = data;
    const serviceConfig: ServiceConfig = {
      name: serviceName,
      internetAccess,
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
        const subscript: string = serverAddr.indexOf(':/');
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

  private async infoFunction(serviceName: string, functionName: string, infoType?: string): Promise<FunctionConfig> {
    const { data } = await this.fcClient.getFunction(serviceName, functionName);
    if (infoType) {
      data.name = data.functionName;
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
    } = data;

    let customContainer: CustomContainerConfig;
    if (customContainerConfig) {
      // 目前支持这三个属性
      customContainer = {
        image: customContainerConfig.image,
        command: customContainerConfig.command,
        args: customContainerConfig.args,
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
    if (!_.isNil(customDNS)) {
      functionConfig.customDns = customDNS;
    }

    if (environmentVariables) {
      functionConfig.environmentVariables = environmentVariables;
    }
    return functionConfig;
  }

  private async infoTrigger(serviceName: string, functionName: string, triggerName: string, infoType?: string): Promise<TriggerConfig> {
    const { data } = await this.fcClient.getTrigger(serviceName, functionName, triggerName);
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
          functionParameter: triggerConfig.functionParameter,
          enable: triggerConfig.enable,
        };
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
    return trigger;
  }

  private async listTriggers(serviceName: string, functionName: string) {
    return (await this.fcClient.listTriggers(serviceName, functionName)).data?.triggers || [];
  }

  async info(serviceName: string, functionName?: string, triggerNames?: string[], infoType?: string): Promise<any> {
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
        info.triggers.push(await this.infoTrigger(serviceName, functionName, triggerName, infoType));
      }
    } else if (functionName && !infoType) {
      const listTriggers = await this.listTriggers(serviceName, functionName);
      if (!_.isEmpty(listTriggers)) {
        Object.assign(info, { triggers: [] });
        for (const { triggerName } of listTriggers) {
          info.triggers.push(await this.infoTrigger(serviceName, functionName, triggerName, infoType));
        }
      }
    }
    return info;
  }
}
