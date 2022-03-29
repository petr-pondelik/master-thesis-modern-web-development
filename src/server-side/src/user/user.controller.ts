import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserSignUpDto } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard';
import { addCollectionLinks, addEntityLinks, createLink } from '../common/hateoas';
import { apiPath } from '../common/helper';
import { ResponseEnvelope } from '../common/envelope';
import { Article, Subscription, ReadingList } from '@prisma/client';
import { ArticlePath } from '../article/article.controller';
import { User } from '../common/decorator';
import { ReadingListService } from '../reading-list/reading-list.service';
import { ReadingListCreateDto } from '../reading-list/dto';
import { ReadingListUpdateDto } from '../reading-list/dto/reading-list.update.dto';

export const UserPath = 'users';
export const UserVersion = '1';

@Controller({
  path: UserPath,
  version: UserVersion,
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly readingListService: ReadingListService
  ) {}

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

  @UseGuards(JwtAuthGuard)
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
        createLink('addArticle', apiPath(UserPath, `${_id}/reading-lists/${rl.title}/articles/:articleId`), 'PUT'),
        createLink(
          'removeArticle',
          apiPath(UserPath, `${_id}/reading-lists/${rl.title}/articles/:articleId`),
          'DELETE',
        ),
      ]);
    }
    return envelope;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/reading-lists/:title')
  async findReadingList(@Param('id', ParseIntPipe) id: number, @Param('title') title: string) {
    const readingList = await this.readingListService.findUnique({
      title_authorId: {
        authorId: id,
        title: title,
      },
    });
    addEntityLinks(readingList, [
      createLink('self', apiPath(UserPath, `${id}/reading-lists/${title}`), 'GET'),
      createLink('update', apiPath(UserPath, `${id}/reading-lists/${title}`), 'PATCH'),
      createLink('delete', apiPath(UserPath, `${id}/reading-lists/${title}`), 'DELETE'),
      createLink('addArticle', apiPath(UserPath, `${id}/reading-lists/${title}/articles/:articleId`), 'PUT'),
      createLink(
        'removeArticle',
        apiPath(UserPath, `${id}/reading-lists/${title}/articles/:articleId`),
        'DELETE',
      ),
    ]);
    return readingList;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/reading-lists/:title/articles')
  async findReadingListArticles(@Param('id', ParseIntPipe) id: number, @Param('title') title: string) {
    const data = await this.readingListService.findAllArticles({ title_authorId: { authorId: id, title: title } });
    const envelope = new ResponseEnvelope<Array<Article>>(data.articles);
    addCollectionLinks(envelope, [
      createLink('self', apiPath(UserPath, `${id}/reading-lists`), 'GET'),
      createLink('create', apiPath(UserPath, `${id}/reading-lists`), 'PUT'),
    ]);
    for (const a of envelope.data) {
      addEntityLinks(a, [
        createLink('detail', apiPath(ArticlePath, `${a.id}`), 'GET'),
        createLink('create', apiPath(UserPath, `${id}/reading-lists/${title}/${a.id}`), 'PUT'),
        createLink('delete', apiPath(UserPath, `${id}/reading-lists/${title}/${a.id}`), 'DELETE'),
      ]);
    }
    return envelope;
  }

  @Post('sign-up')
  async signUp(@Body() dto: UserSignUpDto) {
    return this.userService.signUp(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/reading-lists/:title')
  async createReadingList(
    @Param('id', ParseIntPipe) _id: number,
    @Param('title') title: string,
    @Body() dto: ReadingListCreateDto,
  ) {
    return this.readingListService.create(dto);
  }

  @Patch(':id/reading-lists/:title')
  async updateReadingList(
    @Param('id', ParseIntPipe) id: number,
    @Param('title') title: string,
    @Body() dto: ReadingListUpdateDto,
  ) {
    //TODO: Secure on author
    return this.readingListService.update(id, title, dto);
  }

  @Delete(':id/reading-lists/:title')
  async deleteReadingList(@Param('id', ParseIntPipe) id: number, @Param('title') title: string) {
    //TODO: Secure on author
    return this.readingListService.delete(id, title);
  }

  @Put(':id/reading-lists/:title/articles/:articleId')
  async addArticleIntoReadingList(
    @Param('id', ParseIntPipe) id: number,
    @Param('title') title: string,
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    //TODO: Secure on author
    return this.readingListService.connectArticle(id, title, articleId);
  }

  @Delete(':id/reading-lists/:title/articles/:articleId')
  async deleteArticleFromReadingList(
    @Param('id', ParseIntPipe) id: number,
    @Param('title') title: string,
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    //TODO: Secure on author
    return this.readingListService.disconnectArticle(id, title, articleId);
  }
}
