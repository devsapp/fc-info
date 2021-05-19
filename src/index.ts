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
      boolean: ['help', 'service', 'function', 'trigger'],
      alias: { help: 'h', name: 'n', region: 'r', access: 'a'},
    };
    const comParse: any = core.commandParse({ args }, apts);

    // 将Args转成Object
    comParse.data = comParse.data || {};
    const { region, access, name } = comParse.data;
    const functionName: string = comParse.data['function-name'];
    const serviceName: string = comParse.data['service-name'];
    const isService: boolean = comParse.data.service;
    const isFunction: boolean = comParse.data.function;
    const isTrigger: boolean = comParse.data.trigger;
    return {
      region,
      functionName,
      serviceName,
      name,
      access,
      isService,
      isFunction,
      isTrigger,
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
    const functionName: string = inputs?.props?.functionName || parsedArgs?.functionName;
    let resourceName: string;
    if (parsedArgs?.isService) {
      if (parsedArgs?.isFunction || parsedArgs?.isTrigger) {
        throw new Error('only one of --service/--function/--trigger can be set')
      }
      resourceName = inputs?.props?.serviceName || parsedArgs?.name;
    } else if (parsedArgs?.isFunction) {
      if (parsedArgs?.isTrigger) {
        throw new Error('only one of --service/--function/--trigger can be set')
      }
      resourceName = inputs?.props?.functionName || parsedArgs?.name;
    } else if (parsedArgs?.isTrigger) {
      resourceName = inputs?.props?.triggerName || parsedArgs?.name;
    } else {
      throw new Error('you must specify --service/--function/--trigger flag.');
    }

    const credential: ICredentials = await core.getCredential(inputs?.project?.access);
    await this.report('fc-info', 'info', credential.AccountID, inputs?.project?.access);

    const fcInfo: FcInfo = new FcInfo(credential, region);
    const info: any = fcInfo.info(resourceName, parsedArgs?.isService, parsedArgs?.isFunction, parsedArgs?.isTrigger, serviceName, functionName);
    return info;
  }
}
