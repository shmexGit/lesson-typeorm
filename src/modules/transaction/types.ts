import { Repository } from 'typeorm';

import { Transaction } from './entities/transaction.entity';

export enum TransactionCalculationType {
  CASH = 'cash',
  CARD = 'card',
}

export enum TransactionCurrency {
  RUB = 'rub',
  EUR = 'eur',
  USD = 'usd',
}

export enum TransactionType {
  REPLENISHMENT = 'replenishment of money',
  WRITE_OF = 'write-off of money',
}

export interface ITransactionIntervalDate {
  id: number;
  type: TransactionType;
  amount: number;
  currency: TransactionCurrency;
  createdAt: Date;
  calculationType: TransactionCalculationType;
  resourceName: string;
}

export interface ITransactionRepository {
  findByDateRange: (begin: Date, end: Date) => Promise<Array<ITransactionIntervalDate>>
}

export type TransactionRepository = Repository<Transaction> & ITransactionRepository;
