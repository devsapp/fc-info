export default class FcInfo {
    serviceName: string;
    functionName?: any;
    triggerNames?: any;
    private fcClient;
    constructor(fcClient: any);
    private infoService;
    private infoFunction;
    private infoTrigger;
    private listTriggers;
    info(serviceName: string, functionName?: string, triggerNames?: string[], infoType?: string): Promise<any>;
}
