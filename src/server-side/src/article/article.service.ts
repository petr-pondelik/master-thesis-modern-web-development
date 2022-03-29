import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ArticleCreateDto, ArticleSearchDto, ArticleUpdateDto } from './dto';
import { entityIdSelector } from '../prisma/helper';
import { searchConditionHelper } from './helper';
import { Messages } from './messages';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Constants } from '../prisma/constants';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async findMany(_where: Prisma.ArticleWhereInput = {}, _take = 2) {
    return this.prisma.article.findMany({
      take: _take,
      where: _where,
    });
  }

  async findUnique(where: Prisma.ArticleWhereUniqueInput) {
    const article = await this.prisma.article.findUnique({
      where: where,
    });
    if (article === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return article;
  }

  async search(dto: ArticleSearchDto) {
    const _where = searchConditionHelper(dto);
    return this.prisma.article.findMany({
      where: _where,
    });
  }

  async create(dto: ArticleCreateDto) {
    return this.prisma.article.create({
      data: dto,
      select: entityIdSelector(),
    });
  }

  async update(_id: number, dto: ArticleUpdateDto) {
    try {
      return await this.prisma.article.update({
        where: {
          id: _id,
        },
        data: dto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.RECORD_NOT_FOUND) {
        throw new NotFoundException(Messages.NOT_FOUND);
      }
      throw error;
    }
  }

  async delete(_id: number) {
    try {
      return await this.prisma.article.delete({
        where: {
          id: _id,
        },
        select: entityIdSelector()
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.RECORD_NOT_FOUND) {
        throw new NotFoundException(Messages.NOT_FOUND);
      }
      throw error;
    }
  }
}
