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
var fc_info_1 = __importDefault(require("./lib/fc-info"));
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
                        core.reportComponent(componentName, {
                            command: command,
                            uid: uid,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FcInfoComponent.prototype.argsParser = function (args) {
        var apts = {
            boolean: ['help', 'service', 'function', 'trigger'],
            alias: { help: 'h', name: 'n', region: 'r', access: 'a' },
        };
        var comParse = core.commandParse({ args: args }, apts);
        // 将Args转成Object
        comParse.data = comParse.data || {};
        var _a = comParse.data, region = _a.region, access = _a.access, name = _a.name;
        var functionName = comParse.data['function-name'];
        var serviceName = comParse.data['service-name'];
        var isService = comParse.data.service;
        var isFunction = comParse.data.function;
        var isTrigger = comParse.data.trigger;
        return {
            region: region,
            functionName: functionName,
            serviceName: serviceName,
            name: name,
            access: access,
            isService: isService,
            isFunction: isFunction,
            isTrigger: isTrigger,
        };
    };
    /**
     * info
     * @param inputs
     * @returns
     */
    FcInfoComponent.prototype.info = function (inputs) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, region, serviceName, functionName, resourceName, credential, fcInfo, info;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        parsedArgs = this.argsParser(inputs === null || inputs === void 0 ? void 0 : inputs.args);
                        region = ((_a = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _a === void 0 ? void 0 : _a.region) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.region);
                        serviceName = ((_b = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _b === void 0 ? void 0 : _b.serviceName) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.serviceName);
                        functionName = ((_c = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _c === void 0 ? void 0 : _c.functionName) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.functionName);
                        if (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.isService) {
                            if ((parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.isFunction) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.isTrigger)) {
                                throw new Error('only one of --service/--function/--trigger can be set');
                            }
                            resourceName = ((_d = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _d === void 0 ? void 0 : _d.serviceName) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.name);
                        }
                        else if (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.isFunction) {
                            if (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.isTrigger) {
                                throw new Error('only one of --service/--function/--trigger can be set');
                            }
                            resourceName = ((_e = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _e === void 0 ? void 0 : _e.functionName) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.name);
                        }
                        else if (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.isTrigger) {
                            resourceName = ((_f = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _f === void 0 ? void 0 : _f.triggerName) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.name);
                        }
                        else {
                            throw new Error('you must specify --service/--function/--trigger flag.');
                        }
                        return [4 /*yield*/, core.getCredential((_g = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _g === void 0 ? void 0 : _g.access)];
                    case 1:
                        credential = _j.sent();
                        return [4 /*yield*/, this.report('fc-info', 'info', credential.AccountID, (_h = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _h === void 0 ? void 0 : _h.access)];
                    case 2:
                        _j.sent();
                        fcInfo = new fc_info_1.default(credential, region);
                        info = fcInfo.info(resourceName, parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.isService, parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.isFunction, parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.isTrigger, serviceName, functionName);
                        return [2 /*return*/, info];
                }
            });
        });
    };
    return FcInfoComponent;
}(base_1.default));
exports.default = FcInfoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUEwQztBQUUxQywwREFBOEM7QUFDOUMsd0NBQTRCO0FBRTVCLDBEQUFtQztBQUVuQztJQUE2QyxtQ0FBYTtJQUN4RCx5QkFBWSxLQUFLO2VBQ2Ysa0JBQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVhLGdDQUFNLEdBQXBCLFVBQXFCLGFBQXFCLEVBQUUsT0FBZSxFQUFFLFNBQWtCLEVBQUUsTUFBZTs7Ozs7O3dCQUMxRixHQUFHLEdBQVcsU0FBUyxDQUFDOzZCQUN4QixDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFwQix3QkFBb0I7d0JBQ1kscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTVELFdBQVcsR0FBaUIsU0FBZ0M7d0JBQ2xFLEdBQUcsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDOzs7d0JBRzlCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFOzRCQUNsQyxPQUFPLFNBQUE7NEJBQ1AsR0FBRyxLQUFBO3lCQUNKLENBQUMsQ0FBQzs7Ozs7S0FDSjtJQUVPLG9DQUFVLEdBQWxCLFVBQW1CLElBQVk7UUFDN0IsSUFBTSxJQUFJLEdBQVE7WUFDaEIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDO1lBQ25ELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUM7U0FDekQsQ0FBQztRQUNGLElBQU0sUUFBUSxHQUFRLElBQUksQ0FBQyxZQUFZLENBQUMs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