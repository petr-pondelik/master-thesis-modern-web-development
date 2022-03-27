import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard';
import { ArticleService } from './article.service';
import { NotFoundInterceptor } from '../common/interceptor/not-found.interceptor';
import { Messages } from './messages';
import { CreateDto, SearchDto, UpdateDto } from './dto';

@Controller({
  path: 'articles',
  version: '1',
})
// @UseGuards(JwtAuthGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor(Messages.NOT_FOUND))
  async findOne(@Param('id', ParseIntPipe) _id: number) {
    return this.articleService.findUnique({ id: _id });
  }

  @Post('search')
  async search(@Body() dto: SearchDto) {
    return this.articleService.search(dto);
  }

  @Get(':id/comments')
  async findComments(@Param('id', ParseIntPipe) _id: number) {
    //  TODO
    return _id;
  }

  @Post()
  async create(@Body() dto: CreateDto) {
    return this.articleService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) _id: number, @Body() dto: UpdateDto) {
    //  TODO
    return dto;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) _id: number) {
    //  TODO
    return _id;
  }
}
