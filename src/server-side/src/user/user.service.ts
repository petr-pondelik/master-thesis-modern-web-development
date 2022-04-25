import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Constants } from '../prisma/constants';
import { Messages } from './messages';
import { UserEntity } from './entities';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(_email: string, withPassword = false): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: { email: _email },
      orderBy: { id: 'desc' },
    });
    if (user === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    if (!withPassword) {
      const { password, ...userEntity } = user;
      return userEntity;
    }
    return user;
  }

  async findOneById(_id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: { id: _id },
      orderBy: { id: 'desc' },
    });
    if (user === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    const { password, ...userEntity } = user;
    return userEntity;
  }

  async signUp(dto: SignUpDto): Promise<UserEntity> {
    const passwordHash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: passwordHash,
          givenName: dto.givenName,
          familyName: dto.familyName,
        },
      });
      const { password, ...userEntity } = user;
      return userEntity;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.UNIQ_CONSTRAINT_VIOLATED) {
        throw new ConflictException(Messages.CREDENTIALS_TAKEN);
      }
      throw error;
    }
  }
}
