import { IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  searchString: string;

  @IsString()
  author: string;
}
