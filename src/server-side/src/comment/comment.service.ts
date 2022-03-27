import { Body, Delete, Injectable, Post, Put } from '@nestjs/common';
import { CreateDto } from './dto';

@Injectable()
export class CommentService {

  @Post()
  async create(@Body() dto: CreateDto) {
  //  TODO
    return dto;
  }

  @Put(':id')
  async update() {}

  @Delete(':id')
  async delete() {}
}
