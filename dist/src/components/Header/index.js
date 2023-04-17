"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const styles_1 = __importDefault(require("./styles"));
const Header = () => {
    return (react_1.default.createElement(ink_1.Box, Object.assign({}, styles_1.default.container),
        react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, { bold: true }, "Course NodeJS"),
            react_1.default.createElement(ink_1.Text, { italic: true }, "Lesson TypeORM"))));
};
exports.default = Header;
//# sourceMappingURL=index.js.map