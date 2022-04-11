import { ReadingListService } from './reading-list.service';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ForbiddenException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../auth/guard';
import { UserService } from '../user/user.service';
import { GraphQLUser } from '../common/decorator';
import { CreateReadingListDto, UpdateReadingListDto } from './graphql';
import { StoryService } from '../story/story.service';

@Resolver('ReadingList')
export class ReadingListResolver {
  constructor(
    private readingListService: ReadingListService,
    private userService: UserService,
    private storyService: StoryService,
  ) {}

  @ResolveField('stories')
  async getStories(@Parent() readingList, @Args('limit') limit: number) {
    const { id } = readingList;
    return this.readingListService.findStories(id, limit);
  }

  @ResolveField('author')
  async getAuthor(@Parent() readingList) {
    const { authorId } = readingList;
    return this.userService.findOneById(authorId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('createReadingList')
  async doCreateReadingList(@Args('content') content: CreateReadingListDto, @GraphQLUser() user) {
    /** Owner-level access restriction */
    if (content.authorId !== user.id) {
      throw new ForbiddenException();
    }
    return await this.readingListService.create(content);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('updateReadingList')
  async doUpdateReadingList(
    @Args('id', ParseIntPipe) id: number,
    @Args('content') content: UpdateReadingListDto,
    @GraphQLUser() user,
  ) {
    const resource = await this.readingListService.findById(id);
    /** Owner-level access restriction */
    if (resource.authorId !== user.id) {
      throw new ForbiddenException();
    }
    return await this.readingListService.update(id, content);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('deleteReadingList')
  async doDeleteReadingList(@Args('id', ParseIntPipe) id: number, @GraphQLUser() user) {
    const resource = await this.readingListService.findById(id);
    /** Owner-level access restriction */
    if (resource.authorId !== user.id) {
      throw new ForbiddenException();
    }
    return await this.readingListService.delete(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('addStoryIntoReadingList')
  async doAddStoryIntoReadingList(
    @Args('readingListId', ParseIntPipe) readingListId: number,
    @Args('storyId', ParseIntPipe) storyId: number,
    @GraphQLUser() user,
  ) {
    const resource = await this.readingListService.findById(readingListId);
    /** Owner-level access restriction */
    if (resource.authorId !== user.id) {
      throw new ForbiddenException();
    }
    await this.storyService.findOneById(storyId);
    return await this.readingListService.connectStory(readingListId, storyId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('removeStoryFromReadingList')
  async doRemoveStoryFromReadingList(
    @Args('readingListId', ParseIntPipe) readingListId: number,
    @Args('storyId', ParseIntPipe) storyId: number,
    @GraphQLUser() user,
  ) {
    const resource = await this.readingListService.findById(readingListId);
    /** Owner-level access restriction */
    if (resource.authorId !== user.id) {
      throw new ForbiddenException();
    }
    await this.storyService.findOneById(storyId);
    return await this.readingListService.disconnectStory(readingListId, storyId);
  }
}
