import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Messages } from './messages';

@Injectable()
export class ReadingListService {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(_where: Prisma.ReadingListWhereUniqueInput) {
    const readingList = await this.prisma.readingList.findUnique({
      where: _where,
    });
    if (readingList === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return readingList;
  }

  async findMany(_where: Prisma.ReadingListWhereInput = {}, _take = 100) {
    return this.prisma.readingList.findMany({
      where: _where,
      take: _take,
    });
  }

  async findAllArticles(_where: Prisma.ReadingListWhereUniqueInput) {
    const articles = await this.prisma.readingList.findUnique({
      where: _where,
      select: {
        articles: {
          select: {
            article: true,
          },
        },
      },
    });
    if (articles === null) {
      throw new NotFoundException();
    }
    return articles;
  }

  // async findArticle(_where: Prisma.ReadingListWhereInput) {
  //   // const articles = await this.prisma.readingList.findFirst({
  //   //   where: _where,
  //   //   select: {
  //   //     articles: {
  //   //       select: {
  //   //         article: true,
  //   //       },
  //   //     },
  //   //   },
  //   // });
  //   const article = await this.prisma.readingList.findFirst({
  //     where: _where
  //   });
  //   if (articles === null) {
  //     throw new NotFoundException();
  //   }
  //   return articles;
  // }
}
