import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReadingListCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
