"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeormConfig = void 0;
const config_validator_1 = require("./config.validator");
const getTypeormConfig = () => {
    return {
        type: 'postgres',
        host: config_validator_1.config.DB_HOST,
        port: Number(config_validator_1.config.DB_PORT),
        username: config_validator_1.config.DB_USERNAME,
        password: config_validator_1.config.DB_PASSWORD,
        database: config_validator_1.config.DB_NAME,
        synchronize: config_validator_1.config.DB_SYNCHRONIZE,
        entities: ['src/**/*.entity.ts'],
        subscribers: ['src/**/*.subscriber.ts'],
    };
};
exports.getTypeormConfig = getTypeormConfig;
//# sourceMappingURL=typeorm.config.js.map