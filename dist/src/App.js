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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const ink_tab_1 = require("ink-tab");
const data = [
    {
        name: 'Sosa Saunders',
        gender: 'male',
        age: 17,
        email: 'sosa.saunders@mail.com',
        phone: '+1 (809) 435-2786',
    },
    {
        name: 'Angelina Kirk',
        gender: 'female',
        age: 3,
        email: 'angelina@kirk.io',
        phone: '+1 (870) 567-3516',
    },
    {
        name: 'Bradford Rosales',
        gender: 'male',
        age: 20,
        email: 'bradfordrosales@fast.com',
        phone: '+1 (918) 573-3240',
    },
    {
        name: 'Gwen Schroeder',
        gender: 'female',
        age: 17,
        email: 'gwen@corp.xyz',
        phone: '+1 (987) 417-2062',
    },
    {
        name: 'Ellison Mann',
        gender: 'male',
        age: 5,
        email: 'ellisonmann@katakana.com',
        phone: '+1 (889) 411-2186',
    },
];
const MainContent = ({ activeTab }) => (react_1.default.createElement(ink_1.Box, { width: 90, flexDirection: "column" },
    react_1.default.createElement(ink_1.Box, { paddingLeft: 1, borderStyle: "single" },
        react_1.default.createElement(ink_1.Text, { bold: true, backgroundColor: "blue" }, "Form")),
    react_1.default.createElement(ink_1.Box, { paddingLeft: 2 },
        react_1.default.createElement(ink_1.Text, null,
            activeTab === 'add' && 'Selected tab is "add"',
            activeTab === 'show' && 'Selected tab is "show"',
            activeTab === 'remove' && 'Selected tab is "remove"',
            activeTab === 'update' && 'Selected tab is "update"',
            activeTab === 'help' && 'Selected tab is "help"')),
    react_1.default.createElement(ink_1.Box, { paddingLeft: 1, borderStyle: "single" },
        react_1.default.createElement(ink_1.Text, { bold: true, backgroundColor: "blue" }, "Result"))));
const App = () => {
    const { isFocused } = (0, ink_1.useFocus)({ autoFocus: true });
    const [activeTab, setActiveTab] = (0, react_1.useState)('show');
    const handleChangeTab = (name) => {
        setActiveTab(name);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ink_1.Box, { width: 100, flexDirection: "column" },
            react_1.default.createElement(ink_1.Box, { width: 100, justifyContent: "center", borderStyle: "single" },
                react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
                    react_1.default.createElement(ink_1.Text, { bold: true }, "Course NodeJS"),
                    react_1.default.createElement(ink_1.Text, { italic: true }, "Lesson TypeORM"))),
            react_1.default.createElement(ink_1.Box, { width: 100 },
                react_1.default.createElement(ink_1.Box, { paddingLeft: 1, paddingRight: 1, width: 10, borderStyle: "single", flexDirection: "column", justifyContent: "flex-start" },
                    react_1.default.createElement(ink_1.Box, { marginBottom: 1 },
                        react_1.default.createElement(ink_1.Text, { bold: true, backgroundColor: "blue" }, "Menu")),
                    react_1.default.createElement(ink_tab_1.Tabs, { onChange: handleChangeTab, flexDirection: "column", defaultValue: activeTab, isFocused: isFocused, showIndex: false },
                        react_1.default.createElement(ink_tab_1.Tab, { name: "show" }, "Show"),
                        react_1.default.createElement(ink_tab_1.Tab, { name: "add" }, "Add"),
                        react_1.default.createElement(ink_tab_1.Tab, { name: "remove" }, "Remove"),
                        react_1.default.createElement(ink_tab_1.Tab, { name: "update" }, "Update"),
                        react_1.default.createElement(ink_tab_1.Tab, { name: "help" }, "Help"))),
                react_1.default.createElement(MainContent, { activeTab: activeTab })))));
};
exports.default = App;
//# sourceMappingURL=App.js.map