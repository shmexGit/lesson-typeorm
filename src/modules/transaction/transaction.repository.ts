import { DataSource } from 'typeorm';
import { Resource } from '@lesson-typeorm/modules/resource/resource.entity';

import { Transaction } from './entities/transaction.entity';

export const getTransactionCustomRepository = (dataSource: DataSource) => {
  return dataSource
    .getRepository(Transaction)
    .extend({
      findByDateRange(begin: Date, end: Date) {
        return this.createQueryBuilder('transaction')
        .select('transaction.id', 'id')
        .addSelect('transaction.type', 'type')
        .addSelect('CAST(COALESCE(transaction.amount, 0) as INTEGER)', 'amount')
        .addSelect('transaction.currency', 'currency')
        .addSelect('transaction.created_at', 'createdAt')
        .addSelect('transaction.calculation_type', 'calculationType')
        .addSelect('resource.name', 'resourceName')
        .leftJoin(Resource, 'resource', 'transaction.resource_id = resource.id')
        .where(`transaction.created_at BETWEEN '${begin.toISOString()}' AND '${end.toISOString()}'`)
        .orderBy('transaction.id', 'ASC')
        .getRawMany();
      },
    });
}