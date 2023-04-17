"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const styles_1 = __importDefault(require("./styles"));
const Result = (properties) => {
    const { error, data } = properties;
    const isError = Boolean(error);
    return (react_1.default.createElement(ink_1.Box, Object.assign({}, styles_1.default.container),
        react_1.default.createElement(ink_1.Box, Object.assign({}, styles_1.default.title),
            react_1.default.createElement(ink_1.Text, Object.assign({}, styles_1.default.titleText), "Result")),
        react_1.default.createElement(ink_1.Box, Object.assign({}, styles_1.default.data), isError ? react_1.default.createElement(ink_1.Text, { backgroundColor: "red" }, error) : react_1.default.createElement(ink_1.Text, null, JSON.stringify(data)))));
};
exports.default = Result;
//# sourceMappingURL=index.js.map