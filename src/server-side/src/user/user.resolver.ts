import { UserService } from './user.service';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { ReadingListService } from '../reading-list/reading-list.service';
import { GraphQLUser } from '../common/decorator';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService, private readingListService: ReadingListService) {
  }

  @Query('user')
  async getUser(@Args('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @ResolveField('stories')
  async getStories(@Parent() user, @Args('limit') limit: number) {
    const { id } = user;
    return this.userService.findStories(id, limit);
  }

  @ResolveField('story')
  async getStory(@Parent() user, @Args('id') storyId: number) {
    const { id: userId } = user;
    return this.userService.findStory(userId, storyId);
  }

  @ResolveField('readingLists')
  async getReadingLists(@GraphQLUser() authUser, @Parent() user, @Args('limit') limit: number) {
    console.log(authUser);
    const { id } = user;
    return this.userService.findReadingLists(id, limit);
  }

  @ResolveField('readingList')
  async getReadingList(@Parent() user, @Args('id', ParseIntPipe) id: number) {
    const { userId } = user;
    return this.readingListService.findAuthorsReadingList(id, userId);
  }
}
