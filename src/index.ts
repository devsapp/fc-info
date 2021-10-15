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
    const infoType: string = comParse.data['info-type'];
    const triggerName: any = comParse.data['trigger-name'];
    const triggerNames: string[] = [];
    if (_.isString(triggerName)) {
      triggerNames.push(triggerName);
    } else {
      triggerNames.push(...triggerName);
    }
    const isHelp: boolean = comParse.data.help;

    return {
      region,
      functionName,
      infoType,
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
    const infoType: string = inputs?.props?.infoType || parsedArgs?.infoType;
    const region: string = inputs?.props?.region || parsedArgs?.region;
    const serviceName: string = inputs?.props?.serviceName || parsedArgs?.serviceName;
    if (!serviceName) {
      throw new Error('You must provide serviceName.');
    }
    const functionName: string = inputs?.props?.functionName || parsedArgs?.functionName;
    const triggerNames: string[] = inputs?.props?.triggerNames || parsedArgs?.triggerNames;
    if (!functionName && !_.isEmpty(triggerNames)) {
      throw new Error('Can not specify trigger without function.');
    }

    const fcClient = await this.getFcClient(inputs, region);
    await this.report('fc-info', 'info', fcClient?.accountid);
    const fcInfo: FcInfo = new FcInfo(fcClient);
    return await fcInfo.info(serviceName, functionName, triggerNames, infoType);
  }

  async help(): Promise<void> {
    await this.report('fc-info', 'help');
    core.help(COMPONENT_HELP_INFO);
  }

  private async getFcClient(inputs, region): Promise<any> {
    if (_.isEmpty(inputs.props)) {
      // eslint-disable-next-line no-param-reassign
      inputs.props = {};
    }
    if (_.isEmpty(inputs.props.region)) {
      // eslint-disable-next-line no-param-reassign
      inputs.props.region = region;
    }
    const fcCommon = await core.loadComponent('devsapp/fc-common');
    return fcCommon.makeFcClient(inputs);
  }
}
