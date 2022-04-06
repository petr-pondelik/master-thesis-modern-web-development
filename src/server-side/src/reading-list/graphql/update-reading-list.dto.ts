import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateReadingListContent } from '../../graphql';

export class UpdateReadingListDto extends UpdateReadingListContent {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}