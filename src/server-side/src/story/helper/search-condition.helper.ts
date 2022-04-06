import { SearchStoryDto } from '../dto';
import { Prisma } from '@prisma/client';

export const searchConditionHelper = (dto: SearchStoryDto): Prisma.StoryWhereInput => {
  if (dto.searchString !== '' && dto.author !== '') {
    return {
      AND: [
        {
          OR: [
            {
              title: {
                contains: dto.searchString,
                mode: 'insensitive'
              },
            },
            {
              description: {
                contains: dto.searchString,
                mode: 'insensitive'
              },
            },
          ],
        },
        {
          author: {
            OR: [
              {
                givenName: { contains: dto.author, mode: 'insensitive' },
              },
              {
                familyName: { contains: dto.author, mode: 'insensitive' },
              },
              {
                email: { contains: dto.author, mode: 'insensitive' },
              },
            ],
          },
        },
      ],
    };
  }

  if (dto.searchString !== '') {
    return {
      OR: [
        {
          title: {
            contains: dto.searchString,
            mode: 'insensitive'
          },
        },
        {
          description: {
            contains: dto.searchString,
            mode: 'insensitive'
          },
        },
      ],
    };
  }

  if (dto.author !== '') {
    return {
      author: {
        OR: [
          {
            givenName: { contains: dto.author, mode: 'insensitive' },
          },
          {
            familyName: { contains: dto.author, mode: 'insensitive' },
          },
          {
            email: { contains: dto.author, mode: 'insensitive' },
          },
        ],
      },
    };
  }

  return {};
};
