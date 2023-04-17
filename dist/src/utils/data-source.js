"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const typeorm_1 = require("typeorm");
const typeorm_config_1 = require("../configs/typeorm.config");
const options = (0, typeorm_config_1.getTypeormConfig)();
const dataSource = new typeorm_1.DataSource(options);
const connection = () => {
    try {
        return dataSource.initialize();
    }
    catch (error) {
        throw new Error('Error Connection to DB');
    }
};
exports.connection = connection;
//# sourceMappingURL=data-source.js.map