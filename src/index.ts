import BaseComponent from './common/base';
import { InputProps, ICredentials } from './common/entity';
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';

import FcInfo from './lib/fc-info';

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

    core.reportComponent(componentName, {
      command,
      uid,
    });
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
    const triggerName: any = comParse.data['trigger-name'];
    const triggerNames: string[] = [];
    if (_.isString(triggerName)) {
      triggerNames.push(triggerName);
    } else {
      triggerNames.push(...triggerName);
    }

    return {
      region,
      functionName,
      serviceName,
      triggerNames,
      access
    };
  }

  /**
   * info
   * @param inputs
   * @returns
   */
  public async info(inputs: InputProps): Promise<any> {
    const parsedArgs: any = this.argsParser(inputs?.args);
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
    const access: string = inputs?.project?.access || parsedArgs?.access;
    // if (!access) {
    //   throw new Error(`You must provide access.`);
    // }
    const credential: ICredentials = await core.getCredential(access);
    await this.report('fc-info', 'info', credential.AccountID, access);
    
    const fcInfo: FcInfo = new FcInfo(credential, region);
    return await fcInfo.info(serviceName, functionName, triggerNames);
  }
}
