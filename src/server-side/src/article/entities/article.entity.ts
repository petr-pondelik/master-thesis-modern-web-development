import { Article as ArticleModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleEntity implements ArticleModel {
  @ApiProperty({
    type: Number
  })
  id: number;

  @ApiProperty({
    type: Date
  })
  createdAt: Date;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  content: string;

  @ApiProperty({
    type: Number
  })
  authorId: number;
}
