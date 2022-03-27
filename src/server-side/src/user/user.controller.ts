import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpDto } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard';
import { Messages } from './messages';
import { NotFoundInterceptor } from '../common/interceptor/not-found.interceptor';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.userService.signUp(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor(Messages.NOT_FOUND))
  async findOne(@Param('id', ParseIntPipe) _id: number) {
    return await this.userService.findUnique({ id: _id });
  }
}
