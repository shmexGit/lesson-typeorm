import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { getTypeormConfig } from '../configs/typeorm.config';

const options = getTypeormConfig();
const dataSource = new DataSource(options as PostgresConnectionOptions);

export const connection = () => {
  try {
    return dataSource.initialize();
  } catch(error) {
    throw new Error('Error Connection to DB');
  }
}