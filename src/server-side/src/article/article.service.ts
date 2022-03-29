import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateArticleDto, SearchArticleDto, UpdateArticleDto } from './dto';
import { searchConditionHelper } from './helper';
import { Messages } from './messages';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Constants } from '../prisma/constants';
import { ArticleEntity } from './entities';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async findMany(_where: Prisma.ArticleWhereInput = {}, _take = 2): Promise<Array<ArticleEntity>> {
    return this.prisma.article.findMany({
      take: _take,
      where: _where,
    });
  }

  async findUnique(where: Prisma.ArticleWhereUniqueInput): Promise<ArticleEntity> {
    const article = await this.prisma.article.findUnique({
      where: where,
    });
    if (article === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return article;
  }

  async search(dto: SearchArticleDto): Promise<Array<ArticleEntity>> {
    const _where = searchConditionHelper(dto);
    return this.prisma.article.findMany({
      where: _where,
    });
  }

  async create(dto: CreateArticleDto): Promise<ArticleEntity> {
    return this.prisma.article.create({
      data: dto,
    });
  }

  async update(_id: number, dto: UpdateArticleDto): Promise<ArticleEntity> {
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

  async delete(_id: number): Promise<ArticleEntity> {
    try {
      return await this.prisma.article.delete({
        where: {
          id: _id,
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.RECORD_NOT_FOUND) {
        throw new NotFoundException(Messages.NOT_FOUND);
      }
      throw error;
    }
  }
}
