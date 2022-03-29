import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Messages } from './messages';
import { ReadingListCreateDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Constants } from '../prisma/constants';
import { entityIdSelector } from '../prisma/helper';
import { ReadingListUpdateDto } from './dto/reading-list.update.dto';

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

  async findAllArticles(_where: Prisma.ReadingListWhereUniqueInput) {
    const articles = await this.prisma.readingList.findUnique({
      where: _where,
      select: {
        articles: true,
      },
    });
    if (articles === null) {
      throw new NotFoundException();
    }
    return articles;
  }

  async create(dto: ReadingListCreateDto) {
    try {
      return await this.prisma.readingList.create({
        data: dto,
        select: entityIdSelector(),
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === Constants.UNIQ_CONSTRAINT_VIOLATED) {
        throw new ConflictException(`You already have reading list named '${dto.title}'.`);
      }
      throw error;
    }
  }

  async update(_authorId: number, _title: string, dto: ReadingListUpdateDto) {
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

  async delete(_authorId: number, _title: string) {
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

  async connectArticle(_authorId: number, _title: string, _articleId: number) {
    return this.prisma.readingList.update({
      where: {
        title_authorId: {
          title: _title,
          authorId: _authorId,
        },
      },
      data: {
        articles: {
          connect: {
            id: _articleId,
          },
        },
      },
    });
  }

  async disconnectArticle(_authorId: number, _title: string, _articleId: number) {
    return this.prisma.readingList.update({
      where: {
        title_authorId: {
          title: _title,
          authorId: _authorId,
        },
      },
      data: {
        articles: {
          disconnect: {
            id: _articleId,
          },
        },
      },
    });
  }
}
