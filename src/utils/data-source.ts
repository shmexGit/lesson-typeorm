import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import { getTypeORMConfig } from '@lesson-typeorm/configs/typeorm.config';
import { getConfig } from '@lesson-typeorm/configs/config.validator';

const options = getTypeORMConfig(getConfig(path.resolve(__dirname, '..', '..', '.env')));

const dataSource = new DataSource(options as PostgresConnectionOptions);

export const connection = () => {
  try {
    return dataSource.initialize();
  } catch(error) {
    throw new Error('Error Connection to DB');
  }
}