import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateDto, SearchDto } from './dto';
import { entityIdSelector } from '../prisma/helper';
import { searchConditionHelper } from './helper';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.article.findMany();
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

  async findUnique(where: Prisma.ArticleWhereUniqueInput) {
    return this.prisma.article.findUnique({
      where: where,
    });
  }

  async update() {}
}
