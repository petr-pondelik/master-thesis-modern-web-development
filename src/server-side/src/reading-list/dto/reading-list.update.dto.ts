import { IsNotEmpty, IsString } from 'class-validator';

export class ReadingListUpdateDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}