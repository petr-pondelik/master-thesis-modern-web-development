import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { StoryResolver } from './story.resolver';

@Module({
  controllers: [StoryController],
  providers: [StoryService, StoryResolver],
  exports: [StoryService]
})
export class StoryModule {}
