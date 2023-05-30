import * as repl from 'node:repl';
import { ResourceService } from "@lesson-typeorm/modules/resource/resource.service";
import { TransactionService } from "@lesson-typeorm/modules/transaction/transaction.service";

export interface IConfig {
  DB_HOST: string,
  DB_PORT: number,
  DB_USERNAME: string,
  DB_PASSWORD: string,
  DB_NAME: string,
  DB_SYNCHRONIZE: boolean,
}

export enum ReplNameCommand {
  HELP = 'help',
  EXIT = 'exit',
  TRANSACTION_CREATE = 'tc',
  TRANSACTION_UPDATE = 'tu',
  TRANSACTION_STATISTIC = 'ts',
  TRANSACTION_FIND_ALL = 'tfa',
  TRANSACTION_FIND_PAGINATION = 'tfp',
  TRANSACTION_FIND_RANGE = 'tfr',
  TRANSACTION_REMOVE = 'tr',
  RESOURCE_CREATE = 'rc',
  RESOURCE_UPDATE = 'ru',
  RESOURCE_FIND_ALL = 'rfa',
  RESOURCE_REMOVE = 'rr',
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
};

export type AnyObject = Record<any, any>;

export type AnyClass<T = unknown, U = AnyObject> = {
  new (...arguments_: unknown[]): T;
} & U;

export interface IReplCommand {
  help: string;
  action: (
    services: { transaction: TransactionService, resource: ResourceService },
    callback: (err: Error, result: any) => void,
    dto?: string
  ) => Promise<void> | void | never;
}
