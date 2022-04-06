import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Messages } from './messages';
import { CreateReadingListDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Constants } from '../prisma/constants';
import { UpdateReadingListDto } from './dto/update-reading-list.dto';
import { ReadingListEntity } from './entities';
import { StoryEntity } from '../story/entities';

@Injectable()
export class ReadingListService {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(_title_authorId: { authorId: number, title: string }): Promise<ReadingListEntity> {
    const readingList = await this.prisma.readingList.findUnique({
      where: { title_authorId: _title_authorId },
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
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return readingList;
  }

  async findStories(_title_authorId: { authorId: number, title: string }, _limit: number = 10): Promise<StoryEntity[]> {
    const data = await this.prisma.readingList.findUnique({
      where: { title_authorId: _title_authorId },
      select: {
        stories: {
          take: _limit,
          orderBy: { id: 'desc' }
        },
      },
    });
    if (data === null) {
      throw new NotFoundException();
    }
    return data.stories;
  }

  async create(dto: CreateReadingListDto): Promise<ReadingListEntity> {
    try {
      return await this.prisma.readingList.create({
        data: dto
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.UNIQ_CONSTRAINT_VIOLATED) {
        throw new ConflictException(`You already have reading list named '${dto.title}'.`);
      }
      throw error;
    }
  }

  async update(_authorId: number, _title: string, dto: UpdateReadingListDto): Promise<ReadingListEntity> {
    try {
      return await this.prisma.readingList.update({
        data: dto,
        where: {
          title_authorId: {
            title: _title,
            authorId: _authorId,
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === Constants.UNIQ_CONSTRAINT_VIOLATED) {
          throw new ConflictException(`You already have reading list named '${dto.title}'.`);
        }
        if (error.code === Constants.RECORD_NOT_FOUND) {
          throw new NotFoundException(Messages.NOT_FOUND);
        }
      }
      throw error;
    }
  }

  async delete(_authorId: number, _title: string): Promise<ReadingListEntity> {
    try {
      return await this.prisma.readingList.delete({
        where: {
          title_authorId: {
            title: _title,
            authorId: _authorId,
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.RECORD_NOT_FOUND) {
        throw new NotFoundException(`Reading list '${_title}' does not exist.`);
      }
      throw error;
    }
  }

  async connectStory(_authorId: number, _title: string, _storyId: number): Promise<ReadingListEntity> {
    try {
      return await this.prisma.readingList.update({
        where: {
          title_authorId: {
            title: _title,
            authorId: _authorId,
          },
        },
        data: {
          stories: {
            connect: {
              id: _storyId,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.RECORD_NOT_FOUND) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  async disconnectStory(_authorId: number, _title: string, _storyId: number): Promise<ReadingListEntity> {
    try {
      return await this.prisma.readingList.update({
        where: {
          title_authorId: {
            title: _title,
            authorId: _authorId,
          },
        },
        data: {
          stories: {
            disconnect: {
              id: _storyId,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.RECORD_NOT_FOUND) {
        throw new NotFoundException();
      }
      throw error;
    }
  }
}
