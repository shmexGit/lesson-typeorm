import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  OneToOne
} from 'typeorm';

import { Transaction } from './transaction.entity';

@Entity()
export class TransactionUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Transaction)
  @JoinColumn()
  transaction: Transaction;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt: Date;
}
