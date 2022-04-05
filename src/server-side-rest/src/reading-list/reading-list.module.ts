import { Module } from '@nestjs/common';
import { ReadingListService } from './reading-list.service';

@Module({
  providers: [ReadingListService],
  exports: [ReadingListService]
})
export class ReadingListModule {}
