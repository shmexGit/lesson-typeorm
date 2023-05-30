import { DataSource } from 'typeorm';
import * as path  from 'path';
import { getTypeORMConfig } from '@lesson-typeorm/configs/typeorm.config';
import { getConfig } from '@lesson-typeorm/configs/config.validator';

export const connectionSource = new DataSource(
  getTypeORMConfig(
    getConfig(path.resolve(__dirname, '.env'))
  )
);