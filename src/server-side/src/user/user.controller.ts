import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard';
import { addCollectionLinks, addEntityLinks, createLink } from '../common/hateoas';
import { apiPath } from '../common/helper';
import { ResponseEnvelope } from '../common/envelope';
import { Article, Subscription, ReadingList } from '@prisma/client';
import { ArticlePath } from '../article/article.controller';
import { User } from '../common/decorator';
import { ReadingListService } from '../reading-list/reading-list.service';
import { ArticleService } from '../article/article.service';

export const UserPath = 'users';
export const UserVersion = '1';

@Controller({
  path: UserPath,
  version: UserVersion,
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly readingListService: ReadingListService,
    private readonly articleService: ArticleService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.userService.signUp(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) _id: number) {
    const user = await this.userService.findUnique({ id: _id });
    addEntityLinks(user, [
      createLink('self', apiPath(UserPath, user.id), 'GET'),
      createLink('articles', apiPath(UserPath, `${user.id}/articles`), 'GET'),
    ]);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/articles')
  async findArticles(@Param('id', ParseIntPipe) _id: number) {
    const data = await this.userService.findArticles({ id: _id });
    const envelope = new ResponseEnvelope<Array<Article>>(data.articles);
    addCollectionLinks(envelope, [createLink('self', apiPath(UserPath, `${_id}/articles`), 'GET')]);
    for (const a of envelope.data) {
      addEntityLinks(a, [createLink('detail', apiPath(ArticlePath, a.id), 'GET')]);
    }
    return envelope;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/subscriptions')
  async findSubscriptions(@Param('id', ParseIntPipe) _id: number, @User() user) {
    const data = await this.userService.findSubscriptions({ id: _id });
    const envelope = new ResponseEnvelope<Array<Subscription>>(data.subscribing);
    addCollectionLinks(envelope, [createLink('self', apiPath(UserPath, `${_id}/subscriptions`), 'GET')]);
    for (const s of envelope.data) {
      const links =
        user.id === s.subscriberId
          ? [createLink('delete', apiPath(UserPath, `${_id}/subscriptions/${s.id}`), 'DELETE')]
          : [];
      addEntityLinks(s, links);
    }
    return envelope;
  }

  @Get(':id/reading-lists')
  async findAllReadingLists(@Param('id', ParseIntPipe) _id: number) {
    const data = await this.userService.findReadingLists({ id: _id });
    const envelope = new ResponseEnvelope<Array<ReadingList>>(data.readingLists);
    addCollectionLinks(envelope, [
      createLink('self', apiPath(UserPath, `${_id}/reading-lists`), 'GET'),
      createLink('create', apiPath(UserPath, `${_id}/reading-lists`), 'PUT'),
    ]);
    for (const rl of envelope.data) {
      addEntityLinks(rl, [
        createLink('self', apiPath(UserPath, `${_id}/reading-lists/${rl.title}`), 'GET'),
        createLink('update', apiPath(UserPath, `${_id}/reading-lists/${rl.title}`), 'PATCH'),
        createLink('delete', apiPath(UserPath, `${_id}/reading-lists/${rl.title}`), 'DELETE'),
      ]);
    }
    return envelope;
  }

  @Get(':id/reading-lists/:rlName')
  async findReadingList(@Param('id', ParseIntPipe) _id: number, @Param('rlName') rlName: string) {
    const readingList = await this.readingListService.findUnique({
      title_authorId: {
        authorId: _id,
        title: rlName,
      },
    });
    addEntityLinks(readingList, [
      createLink('self', apiPath(UserPath, `${_id}/reading-lists/${rlName}`), 'GET'),
      createLink('update', apiPath(UserPath, `${_id}/reading-lists/${rlName}`), 'PATCH'),
      createLink('delete', apiPath(UserPath, `${_id}/reading-lists/${rlName}`), 'DELETE'),
    ]);
    return readingList;
  }

  @Get(':id/reading-lists/:rlName/articles')
  async findReadingListArticles(@Param('id', ParseIntPipe) _id: number, @Param('rlName') rlName: string) {
    const data = (
      await this.readingListService.findAllArticles({
        title_authorId: {
          authorId: _id,
          title: rlName,
        },
      })
    ).articles.map((item) => item.article);
    const envelope = new ResponseEnvelope<Array<Article>>(data);
    addCollectionLinks(envelope, [
      createLink('self', apiPath(UserPath, `${_id}/reading-lists`), 'GET'),
      createLink('create', apiPath(UserPath, `${_id}/reading-lists`), 'PUT'),
    ]);
    for (const a of envelope.data) {
      addEntityLinks(a, [
        createLink('self', apiPath(UserPath, `${_id}/reading-lists/${rlName}/articles/${a.id}`), 'GET'),
      ]);
    }
    return envelope;
  }

  @Get(':id/reading-lists/:rlName/articles/:articleId')
  async findOneReadingList(
    @Param('id', ParseIntPipe) _id: number,
    @Param('rlName') rlName: string,
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    // title: rlName,
    //   articles: {
    //   every: {
    //     articleId: _articleId
    //   }
    // }
    const data = await this.articleService.findInReadingList(articleId, rlName);
    return data;
  }

  @Put(':id/reading-lists/:rl-name')
  async createReadingList() {}

  @Patch(':id/reading-lists/:rl-name')
  async updateReadingList() {}

  @Delete(':id/reading-lists/:rl-name')
  async deleteReadingList() {}

  @Put(':id/reading-lists/:rl-name/articles/:article-id')
  async addArticleIntoReadingList() {}

  @Delete(':id/reading-lists/:rl-name/articles/:article-id')
  async deleteArticleFromReadingList() {}
}
