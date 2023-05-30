import { IsNumber, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  name: string;
}

export class UpdateResourceDto extends CreateResourceDto {
  @IsNumber()
  id: number;
}