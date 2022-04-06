import { User as UserModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements Omit<UserModel, 'password'> {
  @ApiProperty({
    type: Number
  })
  id: number;

  @ApiProperty({
    type: Date
  })
  createdAt: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  givenName: string;

  @ApiProperty()
  familyName: string;

  @ApiProperty()
  profileDescription: string;
}
