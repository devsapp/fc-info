export default class FcInfo {
    region: string;
    serviceName: string;
    functionName?: any;
    triggerNames?: any;
    private fcClient;
    constructor(fcClient: any, region: any);
    private infoService;
    private infoFunction;
    private infoTrigger;
    private listTriggers;
    info(serviceName: string, functionName?: string, triggerNames?: string[], infoType?: string): Promise<any>;
}
