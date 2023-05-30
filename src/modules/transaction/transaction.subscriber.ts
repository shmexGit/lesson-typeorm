import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent
} from 'typeorm';
import { Resource } from '@lesson-typeorm/modules/resource/resource.entity';

import { Transaction } from './entities/transaction.entity';

@EventSubscriber()
export class TransactionSubscriber implements EntitySubscriberInterface<Transaction> {
    listenTo() {
        return Transaction
    }
    async afterInsert(event: InsertEvent<Transaction>) {
      const { connection, entity } = event;
      const { amount, type, calculationType, currency, resource } = entity;

      await connection.getRepository(Resource).update(resource.id, {
        amount,
        typeTransaction: type,
        calculationType,
        currency,
      });
    }
}