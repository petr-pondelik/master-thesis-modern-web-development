import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Constants } from '../prisma/constants';
import { Messages } from './messages';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserEntity } from './entities';
import { ArticleEntity } from '../article/entities';
import { ReadingListEntity } from '../reading-list/entities';

@Injectable()
export class UserService {
  allowedFields = {
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

  async findUnique(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique(this.getFindUniqueArgs(where));
    if (user === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return user;
  }

  async findOne(where: Prisma.UserWhereInput): Promise<UserEntity> {
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

  async findArticles(_where: Prisma.UserWhereUniqueInput): Promise<Array<ArticleEntity>> {
    const data = await this.prisma.user.findUnique({
      where: _where,
      select: {
        articles: true,
      },
    });
    if (data === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return data.articles;
  }

  async findReadingLists(_where: Prisma.UserWhereUniqueInput): Promise<Array<ReadingListEntity>> {
    const data = await this.prisma.user.findUnique({
      where: _where,
      select: {
        readingLists: true,
      },
    });
    if (data === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return data.readingLists;
  }

  // async findSubscriptions(_where: Prisma.UserWhereUniqueInput) {
  //   const user = await this.prisma.user.findUnique({
  //     where: _where,
  //     select: {
  //       subscribing: true,
  //     },
  //   });
  //   if (user === null) {
  //     throw new NotFoundException(Messages.NOT_FOUND);
  //   }
  //   return user;
  // }

  async signUp(dto: SignUpDto): Promise<UserEntity> {
    const passwordHash = await argon.hash(dto.password);
    try {
      return await this.prisma.user.create({
        data: {
          email: dto.email,
          password: passwordHash,
          givenName: dto.givenName,
          familyName: dto.familyName,
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.UNIQ_CONSTRAINT_VIOLATED) {
        throw new ConflictException(Messages.CREDENTIALS_TAKEN);
      }
      throw error;
    }
  }
}
