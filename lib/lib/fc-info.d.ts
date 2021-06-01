import { ICredentials } from '../common/entity';
export default class FcInfo {
    private fcClient;
    private region;
    serviceName: string;
    functionName?: any;
    triggerNames?: any;
    constructor(credentials: ICredentials, region: any);
    private infoService;
    private infoFunction;
    private infoTrigger;
    info(serviceName: string, functionName?: string, triggerNames?: string[]): Promise<any>;
}
