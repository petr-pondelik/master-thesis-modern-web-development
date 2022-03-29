import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard';
import { ArticleService } from './article.service';
import { CreateArticleDto, SearchArticleDto, UpdateArticleDto } from './dto';
import { addLinks, createLink } from '../common/hateoas';
import { UserPath } from '../user/user.controller';
import { User } from '../common/decorator';
import { apiPath } from '../common/helper';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocationResponseHeaderInterceptor } from '../common/interceptor';
import { ErrorMessage } from '../common/message';
import { ArticleCollectionEnvelope, ArticleEnvelope } from './envelopes';

export const ArticlePath = 'articles';
export const ArticleVersion = '1';

@ApiTags('Articles')
@Controller({
  path: ArticlePath,
  version: ArticleVersion,
})
@UseGuards(JwtAuthGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiOperation({
    summary: 'Find all articles.',
  })
  @ApiOkResponse({
    description: 'Articles successfully retrieved.',
    type: ArticleCollectionEnvelope,
  })
  async findAll(): Promise<ArticleCollectionEnvelope> {
    const articles = await this.articleService.findMany();
    const envelope = new ArticleCollectionEnvelope(articles);
    addLinks(envelope, [createLink('self', `/${ArticlePath}`, 'GET')]);
    for (const a of envelope.data) {
      addLinks(a, [
        createLink('self', apiPath(ArticlePath, a.id), 'GET'),
        createLink('author', apiPath(UserPath, a.authorId), 'GET'),
      ]);
    }
    return envelope;
  }

  @ApiOperation({
    summary: 'Search articles.',
  })
  @ApiOkResponse({
    description: 'Articles successfully retrieved.',
    type: ArticleCollectionEnvelope,
  })
  @Post('search')
  @HttpCode(200)
  async search(@Body() dto: SearchArticleDto): Promise<ArticleCollectionEnvelope> {
    const articles = await this.articleService.search(dto);
    const envelope = new ArticleCollectionEnvelope(articles);
    addLinks(envelope, [createLink('self', apiPath(ArticlePath), 'GET')]);
    for (const a of envelope.data) {
      addLinks(a, [
        createLink('self', apiPath(ArticlePath, a.id), 'GET'),
        createLink('author', apiPath(UserPath, a.authorId), 'GET'),
      ]);
    }
    return envelope;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find article.',
  })
  @ApiOkResponse({
    description: 'Article successfully retrieved.',
    type: ArticleEnvelope,
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
    type: ErrorMessage,
  })
  async findOne(@Param('id', ParseIntPipe) _id: number, @User() user): Promise<ArticleEnvelope> {
    const article = await this.articleService.findUnique({ id: _id });
    let envelope = new ArticleEnvelope();
    envelope = {...envelope, ...article};
    const links = [
      createLink('self', apiPath(ArticlePath, article.id), 'GET'),
      createLink('author', apiPath(UserPath, article.authorId), 'GET'),
    ];
    if (article.authorId === user.id) {
      links.push(createLink('update', apiPath(ArticlePath, article.id), 'PATCH'));
      links.push(createLink('delete', apiPath(ArticlePath, article.id), 'DELETE'));
    }
    addLinks(envelope, links);
    return envelope;
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new article.',
  })
  @ApiOkResponse({
    description: 'Article successfully created.',
    type: ArticleEnvelope,
  })
  @UseInterceptors(new LocationResponseHeaderInterceptor(apiPath(ArticlePath)))
  async create(@Body() dto: CreateArticleDto): Promise<ArticleEnvelope> {
    const article = await this.articleService.create(dto);
    let envelope = new ArticleEnvelope();
    envelope = {...envelope, ...article};
    addLinks(envelope, [
      createLink('self', apiPath(ArticlePath, article.id), 'GET'),
      createLink('author', apiPath(UserPath, article.authorId), 'GET'),
      createLink('update', apiPath(ArticlePath, article.id), 'PATCH'),
      createLink('delete', apiPath(ArticlePath, article.id), 'DELETE'),
    ]);
    return envelope;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partially update article.',
  })
  @ApiOkResponse({
    description: 'Article successfully updated.',
    type: ArticleEnvelope,
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
    type: ErrorMessage,
  })
  @ApiForbiddenResponse({
    description: 'Access to the article is forbidden.',
    type: ErrorMessage,
  })
  @UseInterceptors(new LocationResponseHeaderInterceptor(apiPath(ArticlePath)))
  async update(
    @Param('id', ParseIntPipe) _id: number,
    @Body() dto: UpdateArticleDto,
    @User() user,
  ): Promise<ArticleEnvelope> {
    /** Owner-level access restriction */
    const article = await this.articleService.findUnique({ id: _id });
    if (user.id !== article.authorId) {
      throw new ForbiddenException();
    }
    const articleNew = await this.articleService.update(_id, dto);
    let envelope = new ArticleEnvelope();
    envelope = {...articleNew, ...envelope};
    addLinks(envelope, [
      createLink('self', apiPath(ArticlePath, article.id), 'GET'),
      createLink('author', apiPath(UserPath, article.authorId), 'GET'),
      createLink('update', apiPath(ArticlePath, article.id), 'PATCH'),
      createLink('delete', apiPath(ArticlePath, article.id), 'DELETE'),
    ]);
    return envelope;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete article.',
  })
  @ApiOkResponse({
    description: 'Article successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
    type: ErrorMessage,
  })
  @ApiForbiddenResponse({
    description: 'Access to the article is forbidden.',
    type: ErrorMessage,
  })
  async delete(@Param('id', ParseIntPipe) _id: number, @User() user) {
    /** Owner-level access restriction */
    const article = await this.articleService.findUnique({ id: _id });
    if (user.id !== article.authorId) {
      throw new ForbiddenException();
    }
    await this.articleService.delete(_id);
  }
}
