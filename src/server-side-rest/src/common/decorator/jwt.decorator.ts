import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import jwtDecode from 'jwt-decode';

export const Jwt = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
  return jwt ? jwtDecode(jwt) : null;
});
