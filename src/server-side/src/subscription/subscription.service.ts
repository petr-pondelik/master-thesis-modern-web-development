import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDto } from './dto';
import { entityIdSelector } from '../prisma/helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async findMany(_where: Prisma.SubscriptionWhereInput = {}, _take = 100) {
    return this.prisma.subscription.findMany({
      where: _where,
      take: _take,
    });
  }

  async create(dto: CreateDto) {
    this.prisma.subscription.create({
      data: dto,
      select: entityIdSelector(),
    });
  }
}
