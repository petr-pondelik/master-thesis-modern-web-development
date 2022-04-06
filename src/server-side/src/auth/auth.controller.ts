import { Controller, Post, UseGuards, Body, HttpCode } from '@nestjs/common';
import { User } from '../common/decorator';
import { SignInDto } from './dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorMessage } from '../common/message';
import { JwtEnvelope } from './envelopes';
import { addLinks, createLink } from '../common/hateoas';
import { apiPath } from '../common/helpers';
import { UserPath } from '../user/user.controller';

@ApiTags('Authentication')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(200)
  @ApiOperation({
    summary: "Validate user's credentials and return signed JWT.",
  })
  @ApiOkResponse({
    description: 'User validated.',
    type: JwtEnvelope
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials.',
    type: ErrorMessage
  })
  async signIn(@Body() dto: SignInDto, @User() user): Promise<JwtEnvelope> {
    const jwt = await this.authService.signToken(user);
    const envelope = new JwtEnvelope(jwt);
    addLinks(envelope, [
      createLink('stories', apiPath(UserPath, `${user.id}/stories`), 'GET'),
      createLink('reading-lists', apiPath(UserPath, `${user.id}/reading-lists`), 'GET'),
    ]);
    return envelope;
  }
}
