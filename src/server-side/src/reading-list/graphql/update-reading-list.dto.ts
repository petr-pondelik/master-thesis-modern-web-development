import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateReadingListContent } from '../../graphql';

export class UpdateReadingListDto extends UpdateReadingListContent {
  @IsString()
  @IsNotEmpty()
  title: string;
}