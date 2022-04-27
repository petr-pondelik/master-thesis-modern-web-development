import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReadingListDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Constants } from '../prisma/constants';
import { UpdateReadingListDto } from './dto';
import { ReadingListEntity } from './entities';
import { StoryEntity } from '../story/entities';

@Injectable()
export class ReadingListService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(_id: number): Promise<ReadingListEntity> {
    const readingList = await this.prisma.readingList.findUnique({
      where: { id: _id }
    });
    if (readingList === null) {
      throw new NotFoundException();
    }
    return readingList;
  }

  async findManyByAuthor(_authorId: number, _limit: number | undefined): Promise<ReadingListEntity[]> {
    const data = await this.prisma.readingList.findMany({
      where: { authorId: _authorId },
      take: _limit,
      orderBy: {
        id: 'desc',
      },
    });
    if (data === null) {
      throw new NotFoundException();
    }
    return data;
  }

  async findOneByAuthor(_id: number, _authorId: number): Promise<ReadingListEntity> {
    const readingList = await this.prisma.readingList.findFirst({
      where: { id: _id, authorId: _authorId },
      include: {
        author: {
          select: {
            givenName: true,
            familyName: true,
          },
        },
      },
    });
    if (readingList === null) {
      throw new NotFoundException();
    }
    return readingList;
  }

  async findStories(_id: number, _limit: number | undefined): Promise<StoryEntity[]> {
    const data = await this.prisma.readingList.findFirst({
      where: { id: _id },
      select: {
        stories: {
          select: {
            story: true,
          },
          take: _limit,
          orderBy: { id: 'desc' },
        },
      },
    });
    if (data === null) {
      throw new NotFoundException();
    }
    return data.stories.map((item) => item.story);
  }

  async create(dto: CreateReadingListDto): Promise<ReadingListEntity> {
    try {
      return await this.prisma.readingList.create({
        data: dto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.UNIQ_CONSTRAINT_VIOLATED) {
        throw new ConflictException(`You already have reading list named '${dto.title}'.`);
      }
      throw error;
    }
  }

  async update(_id: number, dto: UpdateReadingListDto): Promise<ReadingListEntity> {
    try {
      return await this.prisma.readingList.update({
        data: dto,
        where: {
          id: _id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === Constants.UNIQ_CONSTRAINT_VIOLATED) {
          throw new ConflictException(`You already have reading list named '${dto.title}'.`);
        }
        if (error.code === Constants.RECORD_NOT_FOUND) {
          throw new NotFoundException();
        }
      }
      throw error;
    }
  }

  async delete(_id: number): Promise<ReadingListEntity> {
    try {
      await this.prisma.storiesOnReadingLists.deleteMany({
        where: { readingListId: _id },
      });
      return await this.prisma.readingList.delete({
        where: {
          id: _id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.RECORD_NOT_FOUND) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  async connectStory(_id: number, _storyId: number): Promise<ReadingListEntity> {
    try {
      const result = await this.prisma.storiesOnReadingLists.create({
        data: {
          readingListId: _id,
          storyId: _storyId,
        },
        select: {
          readingList: true,
        },
      });
      return result.readingList;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (Constants.RECORD_NOT_FOUND === error.code || Constants.QUERY_INTERPRETATION_ERROR === error.code) {
          throw new NotFoundException();
        } else if (error.code === Constants.UNIQ_CONSTRAINT_VIOLATED) {
          throw new ConflictException();
        }
      }
      throw error;
    }
  }

  async disconnectStory(_id: number, _storyId: number): Promise<ReadingListEntity> {
    try {
      const result = await this.prisma.storiesOnReadingLists.delete({
        where: {
          storyId_readingListId: {
            readingListId: _id,
            storyId: _storyId,
          },
        },
        select: {
          readingList: true,
        },
      });
      return result.readingList;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        (Constants.RECORD_NOT_FOUND === error.code || Constants.QUERY_INTERPRETATION_ERROR === error.code)
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }
}
