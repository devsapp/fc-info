import BaseComponent from './common/base';
import { InputProps, ICredentials } from './common/entity';
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';
import { COMPONENT_HELP_INFO, INFO_HELP_INFO } from './lib/static';
import FcInfo from './lib/fc-info';
import logger from './common/logger';

export default class FcInfoComponent extends BaseComponent {
  constructor(props) {
    super(props);
  }

  private async report(componentName: string, command: string, accountID?: string, access?: string): Promise<void> {
    let uid: string = accountID;
    if (_.isEmpty(accountID)) {
      const credentials: ICredentials = await core.getCredential(access);
      uid = credentials.AccountID;
    }

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
      alias: { help: 'h', region: 'r', access: 'a'},
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
      isHelp
    };
  }

  /**
   * info
   * @param inputs
   * @returns
   */
  public async info(inputs: InputProps): Promise<any> {
    const parsedArgs: any = this.argsParser(inputs?.args);
    const access: string = inputs?.project?.access || parsedArgs?.access;
    // if (!access) {
    //   throw new Error(`You must provide access.`);
    // }
    const credential: ICredentials = await core.getCredential(access);
    await this.report('fc-info', 'info', credential.AccountID, access);
    if (parsedArgs.isHelp) {
      core.help(INFO_HELP_INFO);
      return;
    }
    const infoType: string = inputs?.props?.infoType || parsedArgs?.infoType;
    const region: string = inputs?.props?.region || parsedArgs?.region;
    const serviceName: string = inputs?.props?.serviceName || parsedArgs?.serviceName;
    if (!serviceName) {
      throw new Error(`You must provide serviceName.`);
    }
    const functionName: string = inputs?.props?.functionName || parsedArgs?.functionName;
    const triggerNames: string[] = inputs?.props?.triggerNames || parsedArgs?.triggerNames;
    if (!functionName && !_.isEmpty(triggerNames)) {
      throw new Error(`Can not specify trigger without function.`);
    }

    const endpoint = await this.getFcEndpoint();
    const fcInfo: FcInfo = new FcInfo(credential, region, endpoint);
    return await fcInfo.info(serviceName, functionName, triggerNames, infoType);
  }

  public async help(inputs: InputProps): Promise<void> {
    await this.report('fc-info', 'help', null, inputs?.project?.access);
    core.help(COMPONENT_HELP_INFO);
  }

  private async getFcEndpoint(): Promise<string | undefined> {
    const fcDefault = await core.loadComponent('devsapp/fc-default');
    const fcEndpoint: string = await fcDefault.get({ args: 'fc-endpoint' });
    if (!fcEndpoint) { return undefined; }
    const enableFcEndpoint: any = await fcDefault.get({ args: 'enable-fc-endpoint' });
    return (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined;
  }
}
