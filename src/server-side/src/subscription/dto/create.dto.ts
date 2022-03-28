import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDto {
  @IsNumber()
  @IsNotEmpty()
  subscriberId: number;

  @IsNumber()
  @IsNotEmpty()
  subscribingId: number;
}