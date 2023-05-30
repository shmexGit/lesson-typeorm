import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { TypeormNamingStrategy } from '@lesson-typeorm/utils/typeorm-naming.strategy'
import { IConfig } from '@lesson-typeorm/types';

export const getTypeORMConfig = (config: IConfig): DataSourceOptions & SeederOptions => {
  return {
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: config.DB_SYNCHRONIZE,
    namingStrategy: new TypeormNamingStrategy(),
    migrationsTableName: 'typeorm_migrations',
    entities: ['src/**/*.entity.ts'],
    subscribers: ['src/**/*.subscriber.ts'],
    migrations: ['src/migrations/*.{ts,js}'],
    seeds: ['src/**/*.seed.ts'],
  };
};