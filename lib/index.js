"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var base_1 = __importDefault(require("./common/base"));
var core = __importStar(require("@serverless-devs/core"));
var _ = __importStar(require("lodash"));
var static_1 = require("./lib/static");
var fc_info_1 = __importDefault(require("./lib/fc-info"));
var logger_1 = __importDefault(require("./common/logger"));
var FcInfoComponent = /** @class */ (function (_super) {
    __extends(FcInfoComponent, _super);
    function FcInfoComponent(props) {
        return _super.call(this, props) || this;
    }
    FcInfoComponent.prototype.report = function (componentName, command, accountID, access) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = accountID;
                        if (!_.isEmpty(accountID)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _a.sent();
                        uid = credentials.AccountID;
                        _a.label = 2;
                    case 2:
                        try {
                            core.reportComponent(componentName, {
                                command: command,
                                uid: uid,
                            });
                        }
                        catch (e) {
                            logger_1.default.warning("Component " + componentName + " report error: " + e.message);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FcInfoComponent.prototype.argsParser = function (args) {
        var apts = {
            boolean: ['help'],
            alias: { help: 'h', region: 'r', access: 'a' },
        };
        var comParse = core.commandParse({ args: args }, apts);
        // 将Args转成Object
        comParse.data = comParse.data || {};
        var _a = comParse.data, region = _a.region, access = _a.access;
        var functionName = comParse.data['function-name'];
        var serviceName = comParse.data['service-name'];
        var infoType = comParse.data['info-type'];
        var triggerName = comParse.data['trigger-name'];
        var triggerNames = [];
        if (_.isString(triggerName)) {
            triggerNames.push(triggerName);
        }
        else {
            triggerNames.push.apply(triggerNames, triggerName);
        }
        var isHelp = comParse.data.help;
        return {
            region: region,
            functionName: functionName,
            infoType: infoType,
            serviceName: serviceName,
            triggerNames: triggerNames,
            access: access,
            isHelp: isHelp
        };
    };
    /**
     * info
     * @param inputs
     * @returns
     */
    FcInfoComponent.prototype.info = function (inputs) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, access, credential, infoType, region, serviceName, functionName, triggerNames, endpoint, fcInfo;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        parsedArgs = this.argsParser(inputs === null || inputs === void 0 ? void 0 : inputs.args);
                        access = ((_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.access);
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credential = _g.sent();
                        return [4 /*yield*/, this.report('fc-info', 'info', credential.AccountID, access)];
                    case 2:
                        _g.sent();
                        if (parsedArgs.isHelp) {
                            core.help(static_1.INFO_HELP_INFO);
                            return [2 /*return*/];
                        }
                        infoType = ((_b = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _b === void 0 ? void 0 : _b.infoType) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.infoType);
                        region = ((_c = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _c === void 0 ? void 0 : _c.region) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.region);
                        serviceName = ((_d = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _d === void 0 ? void 0 : _d.serviceName) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.serviceName);
                        if (!serviceName) {
                            throw new Error("You must provide serviceName.");
                        }
                        functionName = ((_e = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _e === void 0 ? void 0 : _e.functionName) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.functionName);
                        triggerNames = ((_f = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _f === void 0 ? void 0 : _f.triggerNames) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.triggerNames);
                        if (!functionName && !_.isEmpty(triggerNames)) {
                            throw new Error("Can not specify trigger without function.");
                        }
                        return [4 /*yield*/, this.getFcEndpoint()];
                    case 3:
                        endpoint = _g.sent();
                        fcInfo = new fc_info_1.default(credential, region, endpoint);
                        return [4 /*yield*/, fcInfo.info(serviceName, functionName, triggerNames, infoType)];
                    case 4: return [2 /*return*/, _g.sent()];
                }
            });
        });
    };
    FcInfoComponent.prototype.help = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.report('fc-info', 'help', null, (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access)];
                    case 1:
                        _b.sent();
                        core.help(static_1.COMPONENT_HELP_INFO);
                        return [2 /*return*/];
                }
            });
        });
    };
    FcInfoComponent.prototype.getFcEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcDefault, fcEndpoint, enableFcEndpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-default')];
                    case 1:
                        fcDefault = _a.sent();
                        return [4 /*yield*/, fcDefault.get({ args: 'fc-endpoint' })];
                    case 2:
                        fcEndpoint = _a.sent();
                        if (!fcEndpoint) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, fcDefault.get({ args: 'enable-fc-endpoint' })];
                    case 3:
                        enableFcEndpoint = _a.sent();
                        return [2 /*return*/, (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined];
                }
            });
        });
    };
    return FcInfoComponent;
}(base_1.default));
exports.default = FcInfoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUEwQztBQUUxQywwREFBOEM7QUFDOUMsd0NBQTRCO0FBQzVCLHVDQUFtRTtBQUNuRSwwREFBbUM7QUFDbkMsMkRBQXFDO0FBRXJDO0lBQTZDLG1DQUFhO0lBQ3hELHlCQUFZLEtBQUs7ZUFDZixrQkFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRWEsZ0NBQU0sR0FBcEIsVUFBcUIsYUFBcUIsRUFBRSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxNQUFlOzs7Ozs7d0JBQzFGLEdBQUcsR0FBVyxTQUFTLENBQUM7NkJBQ3hCLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQXBCLHdCQUFvQjt3QkFDWSxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBNUQsV0FBVyxHQUFpQixTQUFnQzt3QkFDbEUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7Ozt3QkFHOUIsSUFBSTs0QkFDRixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRTtnQ0FDbEMsT0FBTyxTQUFBO2dDQUNQLEdBQUcsS0FBQTs2QkFDSixDQUFDLENBQUM7eUJBQ0o7d0JBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ1YsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsZUFBYSxhQUFhLHVCQUFrQixDQUFDLENBQUMsT0FBUyxDQUFDLENBQUM7eUJBQ3pFOzs7OztLQUNGO0lBRU8sb0NBQVUsR0FBbEIsVUFBbUIsSUFBWTtRQUM3QixJQUFNLElBQUksR0FBUTtZQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDakIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxN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