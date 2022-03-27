import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Constants } from '../prisma/constants';
import { Messages } from './messages';
import { Prisma } from '@prisma/client';
import { entityIdSelector } from '../prisma/helper';

@Injectable()
export class UserService {
  allowedFields: Prisma.UserSelect | null = {
    id: true,
    createdAt: true,
    updatedAt: true,
    email: true,
    givenName: true,
    familyName: true,
    profileDescription: true,
  };

  constructor(private prisma: PrismaService) {}

  private getFindUniqueArgs(where: Prisma.UserWhereUniqueInput): Prisma.UserFindUniqueArgs {
    const args: Prisma.UserFindUniqueArgs = {
      where: where,
    };
    if (this.allowedFields !== null) {
      args.select = this.allowedFields;
    }
    return args;
  }

  async findUnique(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique(this.getFindUniqueArgs(where));
  }

  async findOne(where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({
      where: where,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async signUp(dto: SignUpDto) {
    const passwordHash = await argon.hash(dto.password);
    try {
      return this.prisma.user.create({
        data: {
          email: dto.email,
          password: passwordHash,
          givenName: dto.givenName,
          familyName: dto.familyName,
        },
        select: entityIdSelector(),
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.UNIQ_CONSTRAINT_VIOLATED) {
        throw new ConflictException(Messages.CREDENTIALS_TAKEN);
      }
      throw error;
    }
  }
}
