import {
  Column,
  PrimaryGeneratedColumn,
  Entity
} from 'typeorm';
import {
  TransactionCalculationType,
  TransactionCurrency,
  TransactionType,
} from '@lesson-typeorm/modules/transaction/types';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  typeTransaction?: TransactionType;

  @Column({ nullable: true })
  amount?: number;

  @Column({ nullable: true })
  currency?: TransactionCurrency;

  @Column({ nullable: true })
  calculationType?: TransactionCalculationType;
}
