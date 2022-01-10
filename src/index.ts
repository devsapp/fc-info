import { InputProps } from './common/entity';
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import { COMPONENT_HELP_INFO, INFO_HELP_INFO } from './lib/static';
import FcInfo from './lib/fc-info';
import logger from './common/logger';

export default class FcInfoComponent {
  private async report(componentName: string, command: string, uid?: string): Promise<void> {
    try {
      core.reportComponent(componentName, {
        command,
        uid,
      });
    } catch (e) {
      logger.warning(`Component ${componentName} report error: ${e.message}`);
    }
  }

  private argsParser(args: string) {
    const apts: any = {
      boolean: ['help'],
      alias: { help: 'h', region: 'r', access: 'a' },
    };
    const comParse: any = core.commandParse({ args }, apts);

    // 将Args转成Object
    comParse.data = comParse.data || {};
    const { region, access } = comParse.data;
    const functionName: string = comParse.data['function-name'];
    const serviceName: string = comParse.data['service-name'];
    const outputFile: string = comParse.data.output;
    const infoType: string = outputFile || comParse.data['info-type'];
    const triggerName: any = comParse.data['trigger-name'];
    const domainName: any = comParse.data['domain-name'];
    const triggerNames: string[] = [];
    if (_.isString(triggerName)) {
      triggerNames.push(triggerName);
    } else if (!_.isNil(triggerName)) {
      triggerNames.push(...triggerName);
    }
    const domainNames: string[] = [];
    if (_.isString(domainName)) {
      domainNames.push(domainName);
    } else if (!_.isNil(domainName)) {
      domainNames.push(...domainName);
    }
    const isHelp: boolean = comParse.data.help;

    return {
      region,
      functionName,
      infoType,
      outputFile,
      serviceName,
      triggerNames,
      access,
      isHelp,
    };
  }

  /**
   * info
   * @param inputs
   * @returns
   */
  async info(inputs: InputProps): Promise<any> {
    const parsedArgs: any = this.argsParser(inputs?.args);
    if (parsedArgs.isHelp) {
      core.help(INFO_HELP_INFO);
      return;
    }
    const fcCore = await core.load('devsapp/fc-core');

    const infoType: boolean = inputs?.props?.infoType || parsedArgs?.infoType;
    const region: string = inputs?.props?.region || parsedArgs?.region;
    const serviceName: string = inputs?.props?.serviceName || parsedArgs?.serviceName;
    if (!serviceName) {
      throw new fcCore.CatchableError('serviceName is empty, can be specified by --service-name');
    }
    const functionName: string = inputs?.props?.functionName || parsedArgs?.functionName;
    const triggerNames: string[] = inputs?.props?.triggerNames || parsedArgs?.triggerNames;
    if (!functionName && !_.isEmpty(triggerNames)) {
      throw new fcCore.CatchableError('Can not specify trigger without functionName, can be specified by --function-name');
    }

    const fcClient = await fcCore.makeFcClient({
      region,
      access: inputs?.project?.access,
      credentials: inputs.credentials,
    });
    const accountId = fcClient?.accountid;

    let domainNames: string[] = inputs?.props?.customDomains || parsedArgs?.domainNames;
    if (!_.isEmpty(domainNames)) {
      domainNames = this.handlerDomains(fcCore, domainNames, {
        accountId, region, serviceName, functionName,
      });
    }

    await this.report('fc-info', 'info', accountId);
    const fcInfo: FcInfo = new FcInfo(fcClient, region);
    const resInfo = await fcInfo.info(serviceName, functionName, triggerNames, domainNames, infoType);

    if (parsedArgs.outputFile) {
      await core.fse.outputFile(parsedArgs.outputFile, JSON.stringify(resInfo, null, 2));
    }

    return resInfo;
  }

  async help(): Promise<void> {
    await this.report('fc-info', 'help');
    core.help(COMPONENT_HELP_INFO);
  }

  private handlerDomains(fcCore: any, domainNames: string[], {
    accountId, region, serviceName, functionName,
  }) {
    // 处理 domainName: auto
    return domainNames.map((domainName) => {
      if (fcCore.isAuto(domainName)) {
        if (!functionName) {
          throw new fcCore.CatchableError('domainName is auto, functionName cannot be empty, it can be specified by --function-name');
        }
        return fcCore.genDomainName(accountId, region, serviceName, functionName);
      }
      return domainName;
    });
  }
}
