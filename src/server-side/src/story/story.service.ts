import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateStoryDto, SearchStoryDto, UpdateStoryDto } from './dto';
import { searchConditionHelper } from './helper';
import { Messages } from './messages';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Constants } from '../prisma/constants';
import { StoryEntity } from './entities';
import { ReadingListEntity } from '../reading-list/entities';

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async findMany(_where: Prisma.StoryWhereInput = {}, _take = 10): Promise<Array<StoryEntity>> {
    return this.prisma.story.findMany({
      take: _take,
      where: _where,
      orderBy: { id: 'desc' },
      include: {
        author: {
          select: {
            givenName: true,
            familyName: true,
          },
        },
      },
    });
  }

  async findUnique(where: Prisma.StoryWhereUniqueInput): Promise<StoryEntity> {
    const story = await this.prisma.story.findUnique({
      where: where,
      include: {
        author: {
          select: {
            givenName: true,
            familyName: true,
          },
        },
      },
    });
    if (story === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return story;
  }

  async findFirst(where: Prisma.StoryWhereInput): Promise<StoryEntity> {
    const story = await this.prisma.story.findFirst({
      where: where,
      include: {
        author: {
          select: {
            givenName: true,
            familyName: true,
          },
        },
      },
    });
    if (story === null) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return story;
  }

  async findReadingLists(where: Prisma.StoryWhereUniqueInput): Promise<ReadingListEntity[]> {
    const story = await this.prisma.story.findUnique({
      where: where,
      include: { readingLists: true }
    });
    if (story === null) {
      throw new NotFoundException();
    }
    return story.readingLists;
  }

  async search(dto: SearchStoryDto): Promise<Array<StoryEntity>> {
    const _where = searchConditionHelper(dto);
    return this.prisma.story.findMany({
      where: _where,
      orderBy: { id: 'desc' },
      take: 10,
      include: {
        author: {
          select: {
            givenName: true,
            familyName: true,
          },
        },
      },
    });
  }

  async create(dto: CreateStoryDto): Promise<StoryEntity> {
    return this.prisma.story.create({
      data: dto,
    });
  }

  async update(_id: number, dto: UpdateStoryDto): Promise<StoryEntity> {
    try {
      return await this.prisma.story.update({
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

  async delete(_id: number): Promise<StoryEntity> {
    try {
      return await this.prisma.story.delete({
        where: {
          id: _id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.RECORD_NOT_FOUND) {
        throw new NotFoundException(Messages.NOT_FOUND);
      }
      throw error;
    }
  }
}
