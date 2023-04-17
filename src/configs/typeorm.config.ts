import { config } from './config.validator';

export const getTypeormConfig = () => {
  return {
    type: 'postgres',
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: config.DB_SYNCHRONIZE,
    entities: ['src/**/*.entity.ts'],
    subscribers: ['src/**/*.subscriber.ts'],
  };
};