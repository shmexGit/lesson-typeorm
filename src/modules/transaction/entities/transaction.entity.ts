import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne
} from 'typeorm';
import { Resource } from '@lesson-typeorm/modules/resource/resource.entity';

import {
  TransactionCalculationType,
  TransactionCurrency,
  TransactionType
} from '../types';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: TransactionType.WRITE_OF  })
  type: TransactionType;

  @Column()
  amount: number;

  @Column({ default: TransactionCurrency.RUB })
  currency: TransactionCurrency;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ default: TransactionCalculationType.CARD })
  calculationType: TransactionCalculationType;

  @ManyToOne(() => Resource)
  resource: Resource
}
