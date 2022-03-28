import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateDto, SearchDto, UpdateDto } from './dto';
import { entityIdSelector } from '../prisma/helper';
import { searchConditionHelper } from './helper';

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
    return this.prisma.article.findUnique({
      where: where,
    });
  }

  async findInReadingList(_id: number, rlName: string) {
    return this.prisma.article.findFirst({
      where: {
        id: _id,
        readingLists: {
          some: {
            readingList: {
              title: rlName
            }
          }
        }
      },
    });
  }

  async search(dto: SearchDto) {
    const _where = searchConditionHelper(dto);
    return this.prisma.article.findMany({
      where: _where,
    });
  }

  async create(dto: CreateDto) {
    return this.prisma.article.create({
      data: dto,
      select: entityIdSelector(),
    });
  }

  async update(_id: number, dto: UpdateDto) {
    return this.prisma.article.update({
      where: {
        id: _id,
      },
      data: dto,
    });
  }

  async delete(_id: number) {
    return this.prisma.article.delete({
      where: {
        id: _id,
      },
    });
  }
}
