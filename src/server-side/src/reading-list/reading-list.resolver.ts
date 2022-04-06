import { ReadingListService } from './reading-list.service';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ForbiddenException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../auth/guard';
import { CreateReadingListDto } from './dto';
import { UserService } from '../user/user.service';
import { UpdateReadingListDto } from './dto';
import { GraphQLUser } from '../common/decorator';

@Resolver('ReadingList')
export class ReadingListResolver {
  constructor(private readingListService: ReadingListService, private userService: UserService) {
  }

  @ResolveField('stories')
  async getStories(
    @Parent() readingList,
    @Args('limit') limit: number,
  ) {
    const { authorId, title } = readingList;
    return this.readingListService.findStories({ authorId: authorId, title: title }, limit);
  }

  @ResolveField('author')
  async getAuthor(@Parent() readingList) {
    const { authorId } = readingList;
    return this.userService.findOneById(authorId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('createReadingList')
  async doCreateReadingList(
    @Args('content') content: CreateReadingListDto,
    @GraphQLUser() user
  ) {
    /** Owner-level access restriction */
    if (content.authorId !== user.id) {
      throw new ForbiddenException();
    }
    return await this.readingListService.create(content);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('updateReadingList')
  async doUpdateReadingList(
    @Args('title') title: string,
    @Args('userId', ParseIntPipe) userId: number,
    @Args('content') content: UpdateReadingListDto,
    @GraphQLUser() user
  ) {
    /** Owner-level access restriction */
    if (userId !== user.id) {
      throw new ForbiddenException();
    }
    return await this.readingListService.update(userId, title, content);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('deleteReadingList')
  async doDeleteReadingList(
    @Args('title') title: string,
    @Args('userId') userId: number,
    @GraphQLUser() user
  ) {
    /** Owner-level access restriction */
    if (userId !== user.id) {
      throw new ForbiddenException();
    }
    return await this.readingListService.delete(userId, title);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('addStoryIntoReadingList')
  async doAddStoryIntoReadingList(
    @Args('title') title: string,
    @Args('userId') userId: number,
    @Args('storyId') storyId: number,
    @GraphQLUser() user
  ) {
    /** Owner-level access restriction */
    if (userId !== user.id) {
      throw new ForbiddenException();
    }
    return await this.readingListService.connectStory(userId, title, storyId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('removeStoryFromReadingList')
  async doRemoveStoryFromReadingList(
    @Args('title') title: string,
    @Args('userId') userId: number,
    @Args('storyId') storyId: number,
    @GraphQLUser() user
  ) {
    /** Owner-level access restriction */
    if (userId !== user.id) {
      throw new ForbiddenException();
    }
    return await this.readingListService.disconnectStory(userId, title, storyId);
  }
}
