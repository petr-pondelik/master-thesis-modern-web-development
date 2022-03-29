import { IsString } from 'class-validator';

export class ArticleSearchDto {
  @IsString()
  searchString: string;

  @IsString()
  author: string;
}
