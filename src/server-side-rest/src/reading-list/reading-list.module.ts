import { Module } from '@nestjs/common';
import { ReadingListService } from './reading-list.service';
import { ReadingListResolver } from './reading-list.resolver';

@Module({
  providers: [ReadingListService, ReadingListResolver],
  exports: [ReadingListService]
})
export class ReadingListModule {}
