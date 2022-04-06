import { StoryService } from './story.service';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ForbiddenException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { GqlJwtAuthGuard } from '../auth/guard';
import { CreateStoryDto, UpdateStoryDto } from './dto';
import { GraphQLUser } from '../common/decorator';

@Resolver('Story')
export class StoryResolver {
  constructor(private storyService: StoryService, private userService: UserService) {
  }

  @Query('stories')
  async searchStories(
    @Args('searchString') searchString: string,
    @Args('limit', ParseIntPipe) limit: number
  ) {
    return this.storyService.search({searchString: searchString, author: ''}, limit);
  }

  @Query('story')
  async getStory(
    @Args('id', ParseIntPipe) id: number
  ) {
    return this.storyService.findOneById(id);
  }

  @ResolveField('author')
  async getAuthor(@Parent() story) {
    const { authorId } = story;
    return this.userService.findOneById(authorId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('createStory')
  async doCreateStory(@Args('content') content: CreateStoryDto) {
    return this.storyService.create(content);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('updateStory')
  async doUpdateStory(
    @Args('id', ParseIntPipe) id: number,
    @Args('content') content: UpdateStoryDto,
    @GraphQLUser() user
  ) {
    /** Owner-level access restriction */
    const story = await this.storyService.findOneById(id);
    if (user.id !== story.authorId) {
      throw new ForbiddenException();
    }
    return this.storyService.update(id, content);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation('deleteStory')
  async doDeleteStory(@Args('id', ParseIntPipe) id: number, @GraphQLUser() user) {
    /** Owner-level access restriction */
    const story = await this.storyService.findOneById(id);
    if (user.id !== story.authorId) {
      throw new ForbiddenException();
    }
    return this.storyService.delete(id);
  }
}
