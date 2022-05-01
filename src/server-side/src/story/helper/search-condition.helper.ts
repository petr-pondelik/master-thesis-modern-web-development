import { SearchStoryDto } from '../dto';
import { Prisma } from '@prisma/client';

export const searchConditionHelper = (dto: SearchStoryDto): Prisma.StoryWhereInput => {
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
  return {};
};
