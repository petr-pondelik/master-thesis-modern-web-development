import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionCreateDto } from './dto';
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

  async create(dto: SubscriptionCreateDto) {
    this.prisma.subscription.create({
      data: dto,
      select: entityIdSelector(),
    });
  }
}
