import { ReadingList as ReadingListModel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ReadingListEntity implements ReadingListModel {
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

  @ApiProperty({
    type: Number
  })
  authorId: number;
}
