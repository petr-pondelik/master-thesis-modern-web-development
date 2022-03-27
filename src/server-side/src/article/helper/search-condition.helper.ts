import { SearchDto } from '../dto';
import { Prisma } from '@prisma/client';

export const searchConditionHelper = (dto: SearchDto): Prisma.ArticleWhereInput => {
  if (dto.searchString !== '' && dto.author !== '') {
    return {
      AND: [
        {
          OR: [
            {
              title: {
                contains: dto.searchString,
              },
            },
            {
              description: {
                contains: dto.searchString,
              },
            },
          ],
        },
        {
          author: {
            OR: [
              {
                givenName: { contains: dto.author },
              },
              {
                familyName: { contains: dto.author },
              },
              {
                email: { contains: dto.author },
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
          },
        },
        {
          description: {
            contains: dto.searchString,
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
            givenName: { contains: dto.author },
          },
          {
            familyName: { contains: dto.author },
          },
          {
            email: { contains: dto.author },
          },
        ],
      },
    };
  }

  return {};
};
