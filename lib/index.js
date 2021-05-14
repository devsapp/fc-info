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
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    ComponentDemo.prototype.report = function (componentName, command, accountID, access) {
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
    ComponentDemo.prototype.argsParser = function (args) {
        var apts = {
            boolean: ['help'],
            alias: { help: 'h' },
        };
        var comParse = core.commandParse({ args: args }, apts);
        // 将Args转成Object
        comParse.data = comParse.data || {};
        var region = comParse.data.region;
        var functionName = comParse.data['function-name'];
        var serviceName = comParse.data['service-name'];
        var triggerName = comParse.data['trigger-name'];
        return {
            region: region,
            functionName: functionName,
            serviceName: serviceName,
            triggerName: triggerName,
        };
    };
    /**
     * info
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.info = function (inputs) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var parsedArgs, region, serviceName, functionName, triggerName, triggers, credential, fcInfo, info;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        parsedArgs = this.argsParser(inputs === null || inputs === void 0 ? void 0 : inputs.args);
                        region = ((_b = (_a = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _a === void 0 ? void 0 : _a.service) === null || _b === void 0 ? void 0 : _b.region) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.region);
                        serviceName = ((_d = (_c = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _c === void 0 ? void 0 : _c.service) === null || _d === void 0 ? void 0 : _d.name) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.serviceName);
                        functionName = ((_f = (_e = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _e === void 0 ? void 0 : _e.function) === null || _f === void 0 ? void 0 : _f.name) || (parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.functionName);
                        triggers = (_g = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _g === void 0 ? void 0 : _g.triggers;
                        if (_.isEmpty(triggers)) {
                            triggerName = parsedArgs === null || parsedArgs === void 0 ? void 0 : parsedArgs.triggerName;
                            if (_.isString(triggerName)) {
                                triggerName = [triggerName];
                            }
                        }
                        else {
                            triggerName = triggers.map(function (t) { return t.name; });
                        }
                        return [4 /*yield*/, core.getCredential(inputs.project.access)];
                    case 1:
                        credential = _j.sent();
                        return [4 /*yield*/, this.report('fc-info', 'info', credential.AccountID, (_h = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _h === void 0 ? void 0 : _h.access)];
                    case 2:
                        _j.sent();
                        fcInfo = new fc_info_1.default(credential, region);
                        info = fcInfo.info(serviceName, functionName, triggerName);
                        return [2 /*return*/, info];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUEwQztBQUUxQywwREFBOEM7QUFDOUMsd0NBQTRCO0FBRTVCLDBEQUFtQztBQUVuQztJQUEyQyxpQ0FBYTtJQUN0RCx1QkFBWSxLQUFLO2VBQ2Ysa0JBQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVhLDhCQUFNLEdBQXBCLFVBQXFCLGFBQXFCLEVBQUUsT0FBZSxFQUFFLFNBQWtCLEVBQUUsTUFBZTs7Ozs7O3dCQUMxRixHQUFHLEdBQVcsU0FBUyxDQUFDOzZCQUN4QixDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFwQix3QkFBb0I7d0JBQ1kscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTVELFdBQVcsR0FBaUIsU0FBZ0M7d0JBQ2xFLEdBQUcsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDOzs7d0JBRzlCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFOzRCQUNsQyxPQUFPLFNBQUE7NEJBQ1AsR0FBRyxLQUFBO3lCQUNKLENBQUMsQ0FBQzs7Ozs7S0FDSjtJQUVPLGtDQUFVLEdBQWxCLFVBQW1CLElBQVk7UUFDN0IsSUFBTSxJQUFJLEdBQVE7WUFDaEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2pCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7U0FDckIsQ0FBQztRQUNGLElBQU0sUUFBUSxHQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hELGdCQUFnQjtRQUNoQixRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJ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