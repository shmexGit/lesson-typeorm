"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connextionSource = void 0;
const typeorm_1 = require("typeorm");
exports.connextionSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: './db.sql',
    entities: ['src/**/*.entity.ts'],
    migrationsTableName: 'typeorm_migrations',
    migrations: ['src/migrations/*.{ts,js}'],
});
//# sourceMappingURL=ormconfig.js.map