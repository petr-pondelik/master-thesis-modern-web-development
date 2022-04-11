import { Module } from '@nestjs/common';
import { ReadingListService } from './reading-list.service';
import { ReadingListResolver } from './reading-list.resolver';
import { ReadingListController } from './reading-list.controller';
import { StoryModule } from '../story/story.module';

@Module({
  controllers: [ReadingListController],
  providers: [ReadingListService, ReadingListResolver],
  exports: [ReadingListService],
  imports: [StoryModule]
})
export class ReadingListModule {}
