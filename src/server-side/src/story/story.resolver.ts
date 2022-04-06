import { StoryService } from './story.service';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Resolver('Story')
export class StoryResolver {
  constructor(private storyService: StoryService, private userService: UserService) {
  }

  @Query('stories')
  async searchStories(
    @Args('searchString') searchString: string,
    @Args('last', ParseIntPipe) last: number
  ) {
    return this.storyService.search({searchString: searchString, author: ''}, last);
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
}
