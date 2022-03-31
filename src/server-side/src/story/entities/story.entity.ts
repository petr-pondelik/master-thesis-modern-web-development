import { Story as StoryModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { PartialUserEntity } from '../../user/entities/partial-user.entity';

export class StoryEntity implements StoryModel {
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

  @ApiProperty({
    type: PartialUserEntity
  })
  author?: PartialUserEntity;
}
