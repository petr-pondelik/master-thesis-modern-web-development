import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateReadingListContent } from '../../graphql';

export class CreateReadingListDto extends CreateReadingListContent {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
