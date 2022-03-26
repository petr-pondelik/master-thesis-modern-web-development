import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { User } from '../common/decorator/user.decorator';
import { SignInDto } from './dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto, @User() user) {
    return this.authService.signToken(user);
  }
}
