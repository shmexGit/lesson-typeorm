import { load } from 'ts-dotenv';
import * as path  from 'path';

const schema = {
  NODE_ENV: ['production' as const, 'development' as const],
  DB_HOST: String,
  DB_PORT: Number,
  DB_USERNAME: String,
  DB_PASSWORD: String,
  DB_NAME: String,
  DB_SYNCHRONIZE: Boolean,
};

export const config = load(schema, path.resolve(__dirname, '..', '..', '..', '.env'));