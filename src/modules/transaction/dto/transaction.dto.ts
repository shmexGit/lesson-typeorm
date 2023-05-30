import { IsOptional, IsEnum, IsNumber } from 'class-validator';

import {
  TransactionCalculationType,
  TransactionCurrency,
  TransactionType
} from '../types';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;

  @IsEnum(TransactionCurrency)
  @IsOptional()
  currency?: TransactionCurrency;

  @IsEnum(TransactionCalculationType)
  @IsOptional()
  calculationType?: TransactionCalculationType;

  @IsNumber()
  amount: number;

  @IsNumber()
  resourceId: number;
}

export class UpdateTransactionDto extends CreateTransactionDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsNumber()
  @IsOptional()
  resourceId: number;
}