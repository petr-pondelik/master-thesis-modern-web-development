import { UserService } from './user.service';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { ReadingListService } from '../reading-list/reading-list.service';
import { GraphQLUser } from '../common/decorator';
import { StoryService } from '../story/story.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService,
    private storyService: StoryService,
    private readingListService: ReadingListService,
  ) {}

  @Query('user')
  async getUser(@Args('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @ResolveField('stories')
  async getStories(@Parent() user, @Args('limit') limit: number) {
    const { id } = user;
    return this.storyService.findManyByAuthor(id, limit);
  }

  @ResolveField('story')
  async getStory(@Parent() user, @Args('id') storyId: number) {
    const { id: userId } = user;
    return this.storyService.findOneByAuthor(storyId, userId);
  }

  @ResolveField('readingLists')
  async getReadingLists(@GraphQLUser() authUser, @Parent() user, @Args('limit') limit: number) {
    const { id } = user;
    return this.readingListService.findManyByAuthor(id, limit);
  }

  @ResolveField('readingList')
  async getReadingList(@Parent() user, @Args('id', ParseIntPipe) readingListId: number) {
    const { id: userId } = user;
    return this.readingListService.findOneByAuthor(readingListId, userId);
  }
}
