import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtEnvelope } from './envelopes';
import { JwtPayload } from './strategy';
import { createLink } from '../common/hateoas';
import { apiPath } from '../common/helper';
import { UserPath } from '../user/user.controller';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOne({
      email: email,
    });
    const passwordMatches = await argon.verify(user.password, pass);
    if (user && passwordMatches) {
      return user;
    }
    return null;
  }

  async signToken(user: User): Promise<JwtEnvelope> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      _links: [
        createLink('stories', apiPath(UserPath, `${user.id}/stories`), 'GET'),
        createLink('reading-lists', apiPath(UserPath, `${user.id}/reading-lists`), 'GET'),
      ],
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '12h',
      secret: this.configService.get('JWT_SECRET'),
    });
    return new JwtEnvelope(token);
  }
}
