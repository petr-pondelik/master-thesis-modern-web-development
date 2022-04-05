import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  @IsNotEmpty()
  subscriberId: number;

  @IsNumber()
  @IsNotEmpty()
  subscribingId: number;
}