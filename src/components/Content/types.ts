import { DataSource } from 'typeorm';
import { NameMenuItem } from '../Menu/types';

export interface IContentProperties {
  activeTab: NameMenuItem;
  dataSource: DataSource;
}