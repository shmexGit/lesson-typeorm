"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const ink_tab_1 = require("ink-tab");
const styles_1 = __importDefault(require("./styles"));
const constants_1 = require("./constants");
const Menu = (properties) => {
    const { onChange, isFocused, activeTab } = properties;
    const handleChangeTab = (name) => {
        onChange(name);
    };
    const items = constants_1.menuItems.map((item) => (react_1.default.createElement(ink_tab_1.Tab, { name: item.value }, item.label)));
    return (react_1.default.createElement(ink_1.Box, Object.assign({}, styles_1.default.container),
        react_1.default.createElement(ink_1.Box, { marginBottom: 1 },
            react_1.default.createElement(ink_1.Text, Object.assign({}, styles_1.default.title), "Menu")),
        react_1.default.createElement(ink_tab_1.Tabs, { onChange: handleChangeTab, flexDirection: "column", defaultValue: activeTab, isFocused: isFocused, showIndex: false }, ...items)));
};
exports.default = Menu;
//# sourceMappingURL=index.js.map