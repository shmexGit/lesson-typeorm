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
const Menu_1 = __importDefault(require("../Menu"));
const types_1 = require("../Menu/types");
const Header_1 = __importDefault(require("../Header"));
const Content_1 = __importDefault(require("../Content"));
const data_source_1 = require("../../utils/data-source");
const App = () => {
    const { isFocused } = (0, ink_1.useFocus)({ autoFocus: true });
    const [activeTab, setActiveTab] = (0, react_1.useState)(types_1.NameMenuItem.SHOW);
    const [dataSource, setDataSource] = (0, react_1.useState)(null);
    const [connectionError, setConnectionError] = (0, react_1.useState)('');
    const handleChangeTab = (name) => {
        setActiveTab(name);
    };
    (0, react_1.useEffect)(() => {
        const getDataSource = async () => {
            setDataSource(await (0, data_source_1.connection)());
        };
        getDataSource().catch((error) => {
            setConnectionError(error.message);
        });
    }, [setDataSource, setConnectionError]);
    if (connectionError) {
        return (react_1.default.createElement(ink_1.Box, { padding: 1 },
            react_1.default.createElement(ink_1.Text, { backgroundColor: "red" }, connectionError)));
    }
    if (!dataSource) {
        return react_1.default.createElement(ink_1.Text, null, "Loading connection DB");
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ink_1.Box, { width: 100, flexDirection: "column" },
            react_1.default.createElement(Header_1.default, null),
            react_1.default.createElement(ink_1.Box, { width: 100 },
                react_1.default.createElement(Menu_1.default, { activeTab: activeTab, onChange: handleChangeTab, isFocused: isFocused }),
                react_1.default.createElement(Content_1.default, { dataSource: dataSource, activeTab: activeTab })))));
};
exports.default = App;
//# sourceMappingURL=index.js.map