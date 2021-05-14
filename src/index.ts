import BaseComponent from './common/base';
import { InputProps, ICredentials } from './common/entity';
import * as core from '@serverless-devs/core';
import * as _ from 'lodash';

import FcInfo from './lib/fc-info';

export default class ComponentDemo extends BaseComponent {
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
      alias: { help: 'h' },
    };
    const comParse: any = core.commandParse({ args }, apts);
    // 将Args转成Object
    comParse.data = comParse.data || {};
    const { region } = comParse.data;
    const functionName: string = comParse.data['function-name'];
    const serviceName: string = comParse.data['service-name'];
    const triggerName: string = comParse.data['trigger-name'];

    return {
      region,
      functionName,
      serviceName,
      triggerName,
    };
  }

  /**
   * info
   * @param inputs
   * @returns
   */
  async info(inputs: InputProps): Promise<any> {
    const parsedArgs: any = this.argsParser(inputs?.args);
    const region: string = inputs?.props?.service?.region || parsedArgs?.region;
    const serviceName: string = inputs?.props?.service?.name || parsedArgs?.serviceName;
    const functionName: string = inputs?.props?.function?.name || parsedArgs?.functionName;
    let triggerName: any;
    const triggers: any = inputs?.props?.triggers;
    if (_.isEmpty(triggers)) {
      triggerName = parsedArgs?.triggerName;
      if (_.isString(triggerName)) { triggerName = [triggerName]; }
    } else {
      triggerName = triggers.map((t) => t.name);
    }

    const credential: ICredentials = await core.getCredential(inputs.project.access);
    await this.report('fc-info', 'info', credential.AccountID, inputs?.project?.access);

    const fcInfo: FcInfo = new FcInfo(credential, region);
    const info: any = fcInfo.info(serviceName, functionName, triggerName);
    return info;
  }
}
