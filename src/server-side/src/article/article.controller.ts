import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard';
import { ArticleService } from './article.service';
import { Messages } from './messages';
import { ArticleCreateDto, ArticleSearchDto, ArticleUpdateDto } from './dto';
import { ResponseEnvelope } from '../common/envelope';
import { Article } from '@prisma/client';
import { addCollectionLinks, addEntityLinks, createLink } from '../common/hateoas';
import { UserPath } from '../user/user.controller';
import { User } from '../common/decorator';
import { apiPath } from '../common/helper';

export const ArticlePath = 'articles';
export const ArticleVersion = '1';

@Controller({
  path: ArticlePath,
  version: ArticleVersion,
})
@UseGuards(JwtAuthGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll() {
    const articles = await this.articleService.findMany();
    const envelope = new ResponseEnvelope<Array<Article>>(articles);
    addCollectionLinks(envelope, [createLink('self', `/${ArticlePath}`, 'GET')]);
    for (const a of envelope.data) {
      addEntityLinks(a, [
        createLink('self', apiPath(ArticlePath, a.id), 'GET'),
        createLink('author', apiPath(UserPath, a.authorId), 'GET'),
      ]);
    }
    return envelope;
  }

  @Post('search')
  async search(@Body() dto: ArticleSearchDto) {
    const articles = await this.articleService.search(dto);
    const envelope = new ResponseEnvelope<Array<Article>>(articles);
    addCollectionLinks(envelope, [createLink('self', apiPath(ArticlePath), 'GET')]);
    for (const a of envelope.data) {
      addEntityLinks(a, [
        createLink('self', apiPath(ArticlePath, a.id), 'GET'),
        createLink('author', apiPath(UserPath, a.authorId), 'GET'),
      ]);
    }
    return envelope;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) _id: number, @User() user) {
    const article = await this.articleService.findUnique({ id: _id });
    const links = [
      createLink('self', apiPath(ArticlePath, article.id), 'GET'),
      createLink('author', apiPath(UserPath, article.authorId), 'GET'),
    ];
    if (article.authorId === user.id) {
      links.push(createLink('update', apiPath(ArticlePath, article.id), 'PATCH'));
      links.push(createLink('delete', apiPath(ArticlePath, article.id), 'DELETE'));
    }
    addEntityLinks(article, links);
    return article;
  }

  @Post()
  async create(@Body() dto: ArticleCreateDto) {
    return this.articleService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) _id: number, @Body() dto: ArticleUpdateDto) {
    //TODO: Secure on author
    return this.articleService.update(_id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) _id: number) {
    //TODO: Secure on author
    return this.articleService.delete(_id);
  }
}
