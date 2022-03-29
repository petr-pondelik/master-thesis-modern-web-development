import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchArticleDto {
  @ApiProperty()
  @IsString()
  searchString: string;

  @ApiProperty()
  @IsString()
  author: string;
}
