import { load } from 'ts-dotenv';

const schema = {
  DB_HOST: String,
  DB_PORT: Number,
  DB_USERNAME: String,
  DB_PASSWORD: String,
  DB_NAME: String,
  DB_SYNCHRONIZE: Boolean,
};

export const getConfig = (path: string) => load(schema, path);
