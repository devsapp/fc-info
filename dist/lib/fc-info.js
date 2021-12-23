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
var FcInfo = /** @class */ (function () {
    function FcInfo(fcClient, region) {
        this.region = region;
        this.fcClient = fcClient;
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
                            data.name = data.serviceName;
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
            var data, description, runtime, handler, timeout, initializer, initializationTimeout, memorySize, gpuMemorySize, environmentVariables, instanceConcurrency, customContainerConfig, caPort, instanceType, customDNS, layers, customContainer, functionConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fcClient.getFunction(serviceName, functionName)];
                    case 1:
                        data = (_a.sent()).data;
                        if (infoType) {
                            data.name = data.functionName;
                            return [2 /*return*/, data];
                        }
                        logger_1.default.debug("getFunction data: \n" + JSON.stringify(data, null, '  '));
                        description = data.description, runtime = data.runtime, handler = data.handler, timeout = data.timeout, initializer = data.initializer, initializationTimeout = data.initializationTimeout, memorySize = data.memorySize, gpuMemorySize = data.gpuMemorySize, environmentVariables = data.environmentVariables, instanceConcurrency = data.instanceConcurrency, customContainerConfig = data.customContainerConfig, caPort = data.caPort, instanceType = data.instanceType, customDNS = data.customDNS, layers = data.layers;
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
                            gpuMemorySize: instanceType === 'g1' ? gpuMemorySize : undefined,
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
                        if (!_.isNil(customDNS)) {
                            functionConfig.customDNS = customDNS;
                        }
                        if (!_.isEmpty(layers)) {
                            functionConfig.layers = layers;
                        }
                        if (!_.isEmpty(environmentVariables)) {
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
                            data.name = data.triggerName;
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
                            default:
                                logger_1.default.error("No trigger type matching " + type);
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
    FcInfo.prototype.listTriggers = function (serviceName, functionName) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fcClient.listTriggers(serviceName, functionName)];
                    case 1: return [2 /*return*/, ((_a = (_b.sent()).data) === null || _a === void 0 ? void 0 : _a.triggers) || []];
                }
            });
        });
    };
    FcInfo.prototype.info = function (serviceName, functionName, triggerNames, infoType) {
        return __awaiter(this, void 0, void 0, function () {
            var serviceInfo, info, _a, _b, _c, _d, _i, triggerNames_1, triggerName, _e, _f, listTriggers, _g, listTriggers_1, triggerName, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0: return [4 /*yield*/, this.infoService(serviceName, infoType)];
                    case 1:
                        serviceInfo = _k.sent();
                        info = {
                            region: this.region,
                            service: serviceInfo,
                        };
                        if (!functionName) return [3 /*break*/, 3];
                        _b = (_a = Object).assign;
                        _c = [info];
                        _d = {};
                        return [4 /*yield*/, this.infoFunction(serviceName, functionName, infoType)];
                    case 2:
                        _b.apply(_a, _c.concat([(_d.function = _k.sent(),
                                _d)]));
                        _k.label = 3;
                    case 3:
                        if (!!_.isEmpty(triggerNames)) return [3 /*break*/, 8];
                        Object.assign(info, { triggers: [] });
                        _i = 0, triggerNames_1 = triggerNames;
                        _k.label = 4;
                    case 4:
                        if (!(_i < triggerNames_1.length)) return [3 /*break*/, 7];
                        triggerName = triggerNames_1[_i];
                        _f = (_e = info.triggers).push;
                        return [4 /*yield*/, this.infoTrigger(serviceName, functionName, triggerName, infoType)];
                    case 5:
                        _f.apply(_e, [_k.sent()]);
                        _k.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 13];
                    case 8:
                        if (!(functionName && !infoType)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.listTriggers(serviceName, functionName)];
                    case 9:
                        listTriggers = _k.sent();
                        if (!!_.isEmpty(listTriggers)) return [3 /*break*/, 13];
                        Object.assign(info, { triggers: [] });
                        _g = 0, listTriggers_1 = listTriggers;
                        _k.label = 10;
                    case 10:
                        if (!(_g < listTriggers_1.length)) return [3 /*break*/, 13];
                        triggerName = listTriggers_1[_g].triggerName;
                        _j = (_h = info.triggers).push;
                        return [4 /*yield*/, this.infoTrigger(serviceName, functionName, triggerName, infoType)];
                    case 11:
                        _j.apply(_h, [_k.sent()]);
                        _k.label = 12;
                    case 12:
                        _g++;
                        return [3 /*break*/, 10];
                    case 13: return [2 /*return*/, info];
                }
            });
        });
    };
    return FcInfo;
}());
exports.default = FcInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZmMtaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBNEI7QUFJNUIsNERBQXNDO0FBRXRDO0lBUUUsZ0JBQVksUUFBUSxFQUFFLE1BQU07UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVhLDRCQUFXLEdBQXpCLFVBQTBCLFdBQW1CLEVBQUUsUUFBaUI7Ozs7OzRCQUM3QyxxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBQTs7d0JBQXBELElBQUksR0FBSyxDQUFBLFNBQTJDLENBQUEsS0FBaEQ7d0JBQ1osSUFBSSxRQUFRLEVBQUU7NEJBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDOzRCQUM3QixzQkFBTyxJQUFJLEVBQUM7eUJBQ2I7d0JBQ0QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUcsQ0FBQyxDQUFDO3dCQUMvRCxXQUFXLEdBQTRELElBQUksWUFBaEUsRUFBRSxJQUFJLEdBQXNELElBQUksS0FBMUQsRUFBRSxTQUFTLEdBQTJDLElBQUksVUFBL0MsRUFBRSxTQUFTLEdBQWdDLElBQUksVUFBcEMsRUFBRSxTQUFTLEdBQXFCLElBQUksVUFBekIsRUFBRSxjQUFjLEdBQUssSUFBSSxlQUFULENBQVU7d0JBQzlFLGFBQWEsR0FBa0I7NEJBQ25DLElBQUksRUFBRSxXQUFXOzRCQUNqQixjQUFjLGdCQUFBO3lCQUNmLENBQUM7d0JBRUYsSUFBSSxJQUFJLEVBQUU7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