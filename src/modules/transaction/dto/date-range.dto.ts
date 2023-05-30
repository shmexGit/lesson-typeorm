import { IsString } from 'class-validator';

export class DateRangeDto {
  @IsString()
  begin: string;

  @IsString()
  end: string;
}