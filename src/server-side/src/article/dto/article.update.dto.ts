import { IsOptional, IsString } from 'class-validator';

export class ArticleUpdateDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  content: string;
}