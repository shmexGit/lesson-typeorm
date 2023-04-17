"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const Result_1 = __importDefault(require("../Result"));
const types_1 = require("../Menu/types");
const styles_1 = __importDefault(require("./styles"));
const Content = (properties) => {
    const { activeTab, dataSource } = properties;
    const [result, setResult] = (0, react_1.useState)(null);
    const [queryError, setQueryError] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        const getQuery = async () => {
            setResult(await dataSource.query('SELECT 1 + 1'));
        };
        getQuery().catch((error) => {
            setQueryError(error.message);
        });
    }, [setResult, setQueryError]);
    return (react_1.default.createElement(ink_1.Box, Object.assign({}, styles_1.default.container),
        react_1.default.createElement(ink_1.Box, Object.assign({}, styles_1.default.title),
            react_1.default.createElement(ink_1.Text, Object.assign({}, styles_1.default.titleText),
                activeTab === types_1.NameMenuItem.ADD && 'Form Add',
                activeTab === types_1.NameMenuItem.SHOW && 'Form Show',
                activeTab === types_1.NameMenuItem.REMOVE && 'Form Remove',
                activeTab === types_1.NameMenuItem.UPDATE && 'Form Update')),
        react_1.default.createElement(ink_1.Box, { paddingLeft: 2 },
            react_1.default.createElement(ink_1.Text, null,
                activeTab === types_1.NameMenuItem.ADD && 'Selected tab is "add"',
                activeTab === types_1.NameMenuItem.SHOW && 'Selected tab is "show"',
                activeTab === types_1.NameMenuItem.REMOVE && 'Selected tab is "remove"',
                activeTab === types_1.NameMenuItem.UPDATE && 'Selected tab is "update"',
                activeTab === types_1.NameMenuItem.HELP && 'Selected tab is "help"')),
        react_1.default.createElement(Result_1.default, { error: queryError, data: result })));
};
exports.default = Content;
//# sourceMappingURL=index.js.map