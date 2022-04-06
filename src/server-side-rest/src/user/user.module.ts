import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ReadingListModule } from '../reading-list/reading-list.module';
import { StoryModule } from '../story/story.module';
import { UserResolver } from './user.resolver';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
  imports: [ReadingListModule, StoryModule]
})
export class UserModule {}
