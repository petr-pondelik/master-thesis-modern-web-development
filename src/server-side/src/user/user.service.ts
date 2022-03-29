import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserSignUpDto } from './dto';
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
    const user = await this.prisma.user.findUnique(this.getFindUniqueArgs(where));
    if (user === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return user;
  }

  async findOne(where: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({
      where: where,
      orderBy: {
        id: 'desc',
      },
    });
    if (user === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return user;
  }

  async findArticles(_where: Prisma.UserWhereUniqueInput) {
    const articles = await this.prisma.user.findUnique({
      where: _where,
      select: {
        articles: true
      }
    });
    if (articles === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return articles;
  }

  async findReadingLists(_where: Prisma.UserWhereUniqueInput) {
    const readingLists = await this.prisma.user.findUnique({
      where: _where,
      select: {
        readingLists: true
      }
    });
    if (readingLists === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return readingLists;
  }

  async findSubscriptions(_where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where: _where,
      select: {
        subscribing: true
      }
    });
    if (user === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return user;
  }

  async signUp(dto: UserSignUpDto) {
    const passwordHash = await argon.hash(dto.password);
    try {
      return await this.prisma.user.create({
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
