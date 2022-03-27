import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateDto } from './dto';
import { UpdateDto } from '../article/dto';

@Controller({
  path: 'comments',
  version: '1',
})
export class CommentController {
  @Post()
  async create(@Body() dto: CreateDto) {
    //TODO
    return dto;
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) _id: number, @Body() dto: UpdateDto) {
  //  TODO
    return _id;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) _id: number) {
  //  TODO
    return _id;
  }
}
