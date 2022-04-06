import { UserEntity } from './user.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PartialUserEntity implements Partial<UserEntity> {
  @ApiPropertyOptional({
    type: Number
  })
  id?: number;

  @ApiPropertyOptional({
    type: Date
  })
  createdAt?: Date;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  givenName?: string;

  @ApiPropertyOptional()
  familyName?: string;

  @ApiPropertyOptional()
  profileDescription?: string;
}