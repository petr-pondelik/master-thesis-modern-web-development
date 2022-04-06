import { ReadingListService } from './reading-list.service';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('ReadingList')
export class ReadingListResolver {
  constructor(private readingListService: ReadingListService) {
  }

  @ResolveField('stories')
  async getStories(
    @Parent() readingList,
    @Args('last') last: number,
  ) {
    const { authorId, title } = readingList;
    return this.readingListService.findStories({ authorId: authorId, title: title }, last);
  }
}
