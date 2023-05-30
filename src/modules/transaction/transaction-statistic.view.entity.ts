import {
  DataSource,
  ViewColumn,
  ViewEntity,
} from 'typeorm';

import { Transaction } from './entities/transaction.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select(`to_char(created_at, 'YYYY-MM')`, 'date')
      .addSelect('type', 'type')
      .addSelect('CAST(COALESCE(SUM(amount), 0) as INTEGER)', 'total')
      .from(Transaction, 'transaction')
      .groupBy('1, 2')
})
export class TransactionStatisticView {
  @ViewColumn()
  date: string;

  @ViewColumn()
  type: string;

  @ViewColumn()
  total: number;
}