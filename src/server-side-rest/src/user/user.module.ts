import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ReadingListModule } from '../reading-list/reading-list.module';
import { StoryModule } from '../story/story.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [ReadingListModule, StoryModule]
})
export class UserModule {}
