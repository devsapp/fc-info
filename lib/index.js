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
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, access, credential, region, serviceName, functionName, triggerNames, fcInfo;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        parsedArgs = this.argsParser(inputs === null || inputs === void 0 ? void 0 : inputs.args);
                        access = ((_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.access);
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credential = _f.sent();
                        return [4 /*yield*/, this.report('fc-info', 'info', credential.AccountID, access)];
                    case 2:
                        _f.sent();
                        if (parsedArgs.isHelp) {
                            core.help(static_1.INFO_HELP_INFO);
                            return [2 /*return*/];
                        }
                        region = ((_b = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _b === void 0 ? void 0 : _b.region) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.region);
                        serviceName = ((_c = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _c === void 0 ? void 0 : _c.serviceName) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.serviceName);
                        if (!serviceName) {
                            throw new Error("You must provide serviceName.");
                        }
                        functionName = ((_d = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _d === void 0 ? void 0 : _d.functionName) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.functionName);
                        triggerNames = ((_e = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _e === void 0 ? void 0 : _e.triggerNames) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.triggerNames);
                        if (!functionName && !_.isEmpty(triggerNames)) {
                            throw new Error("Can not specify trigger without function.");
                        }
                        fcInfo = new fc_info_1.default(credential, region);
                        return [4 /*yield*/, fcInfo.info(serviceName, functionName, triggerNames)];
                    case 3: return [2 /*return*/, _f.sent()];
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
    return FcInfoComponent;
}(base_1.default));
exports.default = FcInfoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUEwQztBQUUxQywwREFBOEM7QUFDOUMsd0NBQTRCO0FBQzVCLHVDQUFtRTtBQUNuRSwwREFBbUM7QUFDbkMsMkRBQXFDO0FBRXJDO0lBQTZDLG1DQUFhO0lBQ3hELHlCQUFZLEtBQUs7ZUFDZixrQkFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRWEsZ0NBQU0sR0FBcEIsVUFBcUIsYUFBcUIsRUFBRSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxNQUFlOzs7Ozs7d0JBQzFGLEdBQUcsR0FBVyxTQUFTLENBQUM7NkJBQ3hCLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQXBCLHdCQUFvQjt3QkFDWSxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBNUQsV0FBVyxHQUFpQixTQUFnQzt3QkFDbEUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7Ozt3QkFHOUIsSUFBSTs0QkFDRixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRTtnQ0FDbEMsT0FBTyxTQUFBO2dDQUNQLEdBQUcsS0FBQTs2QkFDSixDQUFDLENBQUM7eUJBQ0o7d0JBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ1YsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsZUFBYSxhQUFhLHVCQUFrQixDQUFDLENBQUMsT0FBUyxDQUFDLENBQUM7eUJBQ3pFOzs7OztLQUNGO0lBRU8sb0NBQVUsR0FBbEIsVUFBbUIsSUFBWTtRQUM3QixJQUFNLElBQUksR0FBUTtZQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDakIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxN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