import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchStoryDto {
  @ApiProperty()
  @IsString()
  searchString: string;

  @ApiProperty()
  @IsString()
  author: string;
}
