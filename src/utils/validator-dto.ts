import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AnyClass, AnyObject } from '@lesson-typeorm/types';

export async function validatorDto(ValidationClass: AnyClass, input: AnyObject) {
  const dto = plainToInstance(ValidationClass, input);
  await validateOrReject(dto as object);
  return dto;
}
