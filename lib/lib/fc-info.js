"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var logger_1 = __importDefault(require("../common/logger"));
var FC = require('@alicloud/fc2');
var DEFAULT_CLIENT_TIMEOUT = 300;
var FcInfo = /** @class */ (function () {
    function FcInfo(credentials, region, endpoint) {
        if (_.isNil(region)) {
            throw new Error('please provide region.');
        }
        this.region = region;
        this.fcClient = new FC(credentials.AccountID, {
            endpoint: endpoint,
            accessKeyID: credentials.AccessKeyID,
            accessKeySecret: credentials.AccessKeySecret,
            securityToken: credentials.stsToken,
            region: this.region,
            timeout: DEFAULT_CLIENT_TIMEOUT * 1000,
        });
    }
    FcInfo.prototype.infoService = function (serviceName, infoType) {
        return __awaiter(this, void 0, void 0, function () {
            var data, description, role, logConfig, vpcConfig, nasConfig, internetAccess, serviceConfig, handlerDir_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fcClient.getService(serviceName)];
                    case 1:
                        data = (_a.sent()).data;
                        if (infoType) {
                            data['name'] = data.serviceName;
                            return [2 /*return*/, data];
                        }
                        logger_1.default.debug("getService data: \n" + JSON.stringify(data, null, '  '));
                        description = data.description, role = data.role, logConfig = data.logConfig, vpcConfig = data.vpcConfig, nasConfig = data.nasConfig, internetAccess = data.internetAccess;
                        serviceConfig = {
                            name: serviceName,
                            internetAccess: internetAccess,
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
                            handlerDir_1 = function (_a) {
                                var serverAddr = _a.serverAddr, mountDir = _a.mountDir;
                                var subscript = serverAddr.indexOf(':/');
                                var itemConfig = {
                                    serverAddr: serverAddr.substr(0, subscript),
                                    nasDir: serverAddr.substr(subscript + 1),
                                    fcDir: mountDir,
                                };
                                return itemConfig;
                            };
                            serviceConfig.nasConfig = {
                                userId: nasConfig.userId,
                                groupId: nasConfig.groupId,
                                mountPoints: nasConfig.mountPoints.map(function (item) { return handlerDir_1(item); }),
                            };
                        }
                        if (logConfig && logConfig.logstore) {
                            serviceConfig.logConfig = {
                                logstore: logConfig.logstore,
                                project: logConfig.project,
                            };
                        }
                        return [2 /*return*/, serviceConfig];
                }
            });
        });
    };
    FcInfo.prototype.infoFunction = function (serviceName, functionName, infoType) {
        return __awaiter(this, void 0, void 0, function () {
            var data, description, runtime, handler, timeout, initializer, initializationTimeout, memorySize, environmentVariables, instanceConcurrency, customContainerConfig, caPort, instanceType, customContainer, functionConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fcClient.getFunction(serviceName, functionName)];
                    case 1:
                        data = (_a.sent()).data;
                        if (infoType) {
                            data['name'] = data.functionName;
                            return [2 /*return*/, data];
                        }
                        logger_1.default.debug("getFunction data: \n" + JSON.stringify(data, null, '  '));
                        description = data.description, runtime = data.runtime, handler = data.handler, timeout = data.timeout, initializer = data.initializer, initializationTimeout = data.initializationTimeout, memorySize = data.memorySize, environmentVariables = data.environmentVariables, instanceConcurrency = data.instanceConcurrency, customContainerConfig = data.customContainerConfig, caPort = data.caPort, instanceType = data.instanceType;
                        if (customContainerConfig) {
                            // 目前支持这三个属性
                            customContainer = {
                                image: customContainerConfig.image,
                                command: customContainerConfig.command,
                                args: customContainerConfig.args,
                            };
                        }
                        functionConfig = {
                            name: functionName,
                            runtime: runtime,
                            handler: handler,
                            timeout: timeout,
                            instanceType: instanceType,
                            memorySize: memorySize,
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
                        if (environmentVariables) {
                            functionConfig.environmentVariables = environmentVariables;
                        }
                        return [2 /*return*/, functionConfig];
                }
            });
        });
    };
    FcInfo.prototype.infoTrigger = function (serviceName, functionName, triggerName, infoType) {
        return __awaiter(this, void 0, void 0, function () {
            var data, triggerConfig, qualifier, triggerType, sourceArn, invocationRole, type, config, arnConfig, arnOtsConfig, trigger;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fcClient.getTrigger(serviceName, functionName, triggerName)];
                    case 1:
                        data = (_a.sent()).data;
                        if (infoType) {
                            data['name'] = data.triggerName;
                            return [2 /*return*/, data];
                        }
                        logger_1.default.debug("getTrigger data: \n" + JSON.stringify(data, null, '  '));
                        triggerConfig = data.triggerConfig, qualifier = data.qualifier, triggerType = data.triggerType, sourceArn = data.sourceArn, invocationRole = data.invocationRole;
                        type = triggerType.toLocaleLowerCase();
                        switch (type) {
                            case 'http':
                                config = {
                                    qualifier: qualifier,
                                    authType: triggerConfig.authType,
                                    methods: triggerConfig.methods,
                                };
                                break;
                            case 'oss':
                                config = {
                                    qualifier: qualifier,
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
                                    qualifier: qualifier,
                                    cronExpression: triggerConfig.cronExpression,
                                    enable: triggerConfig.enable,
                                    payload: triggerConfig.payload,
                                };
                                break;
                            case 'cdn_events':
                                type = 'cdnEvents';
                                config = {
                                    qualifier: qualifier,
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
                                    qualifier: qualifier,
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
                                arnConfig = sourceArn.split(':');
                                type = 'mnsTopic';
                                config = {
                                    qualifier: qualifier,
                                    filterTag: triggerConfig.filterTag,
                                    notifyStrategy: triggerConfig.notifyStrategy,
                                    notifyContentFormat: triggerConfig.notifyContentFormat,
                                    region: arnConfig[2],
                                    topicName: arnConfig.pop().split('/').pop(),
                                };
                                break;
                            }
                            case 'tablestore': {
                                arnOtsConfig = sourceArn.split(':').pop().split('/');
                                type = 'TableStore';
                                config = {
                                    qualifier: qualifier,
                                    tableName: arnOtsConfig[3],
                                    instanceName: arnOtsConfig[1],
                                };
                                break;
                            }
                        }
                        trigger = {
                            name: triggerName,
                            type: triggerType.toLocaleLowerCase(),
                            config: config,
                        };
                        if (invocationRole) {
                            trigger.role = invocationRole;
                        }
                        if (sourceArn) {
                            trigger.sourceArn = sourceArn;
                        }
                        return [2 /*return*/, trigger];
                }
            });
        });
    };
    FcInfo.prototype.info = function (serviceName, functionName, triggerNames, infoType) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceInfo, info, _a, _b, _c, _d, _i, triggerNames_1, triggerName, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.infoService(serviceName, infoType)];
                    case 1:
                        serviceInfo = _g.sent();
                        info = {
                            service: serviceInfo
                        };
                        if (!functionName) return [3 /*break*/, 3];
                        _b = (_a = Object).assign;
                        _c = [info];
                        _d = {};
                        return [4 /*yield*/, this.infoFunction(serviceName, functionName, infoType)];
                    case 2:
                        _b.apply(_a, _c.concat([(_d.function = _g.sent(),
                                _d)]));
                        _g.label = 3;
                    case 3:
                        if (!!_.isEmpty(triggerNames)) return [3 /*break*/, 7];
                        Object.assign(info, { triggers: [] });
                        _i = 0, triggerNames_1 = triggerNames;
                        _g.label = 4;
                    case 4:
                        if (!(_i < triggerNames_1.length)) return [3 /*break*/, 7];
                        triggerName = triggerNames_1[_i];
                        _f = (_e = info.triggers).push;
                        return [4 /*yield*/, this.infoTrigger(serviceName, functionName, triggerName, infoType)];
                    case 5:
                        _f.apply(_e, [_g.sent()]);
                        _g.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, info];
                }
            });
        });
    };
    return FcInfo;
}());
exports.default = FcInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZmMtaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBNEI7QUFLNUIsNERBQXNDO0FBRXRDLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUVwQyxJQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQztBQUVuQztJQVFFLGdCQUFZLFdBQXlCLEVBQUUsTUFBTSxFQUFFLFFBQVE7UUFDckQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQUU7UUFDbkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQzVDLFFBQVEsVUFBQTtZQUNSLFdBQVcsRUFBRSxXQUFXLENBQUMsV0FBVztZQUNwQyxlQUFlLEVBQUUsV0FBVyxDQUFDLGVBQWU7WUFDNUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxRQUFRO1lBQ25DLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsc0JBQXNCLEdBQUcsSUFBSTtTQUN2QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRWEsNEJBQVcsR0FBekIsVUFBMEIsV0FBbUIsRUFBRSxRQUFpQjs7Ozs7NEJBQzdDLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBcEQsSUFBSSxHQUFLLENBQUEsU0FBMkMsQ0FBQSxLQUFoRDt3QkFDWixJQUFHLFFBQVEsRUFBQzs0QkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcs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