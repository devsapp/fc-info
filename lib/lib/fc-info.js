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
    function FcInfo(credentials, region) {
        if (_.isNil(region)) {
            throw new Error('please provide region.');
        }
        this.region = region;
        this.fcClient = new FC(credentials.AccountID, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZmMtaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBNEI7QUFLNUIsNERBQXNDO0FBRXRDLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUVwQyxJQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQztBQUVuQztJQVFFLGdCQUFZLFdBQXlCLEVBQUUsTUFBTTtRQUMzQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FBRTtRQUNuRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7WUFDNUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXO1lBQ3BDLGVBQWUsRUFBRSxXQUFXLENBQUMsZUFBZTtZQUM1QyxhQUFhLEVBQUUsV0FBVyxDQUFDLFFBQVE7WUFDbkMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRSxzQkFBc0IsR0FBRyxJQUFJO1NBQ3ZDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFYSw0QkFBVyxHQUF6QixVQUEwQixXQUFtQixFQUFFLFFBQWlCOzs7Ozs0QkFDN0MscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUE7O3dCQUFwRCxJQUFJLEdBQUssQ0FBQSxTQUEyQyxDQUFBLEtBQWhEO3dCQUNaLElBQUcsUUFBUSxFQUFDOzRCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFBOzRCQUMv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