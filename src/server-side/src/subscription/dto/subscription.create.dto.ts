import { IsNotEmpty, IsNumber } from 'class-validator';

export class SubscriptionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  subscriberId: number;

  @IsNumber()
  @IsNotEmpty()
  subscribingId: number;
}