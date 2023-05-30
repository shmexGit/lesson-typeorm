import { DataSource } from 'typeorm';
import * as path  from 'path';
import { getTypeormConfig } from '@lesson-typeorm/configs/typeorm.config';
import { getConfig } from '@lesson-typeorm/configs/config.validator';

export const connectionSource = new DataSource(
  getTypeormConfig(
    getConfig(path.resolve(__dirname, '.env'))
  )
);