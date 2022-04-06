import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorMessage {
  @ApiProperty({
    type: Number
  })
  statusCode: number;

  @ApiPropertyOptional()
  error?: string;

  @ApiProperty()
  message: string;
}