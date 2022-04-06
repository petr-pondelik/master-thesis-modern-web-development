import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './strategy';
import { UserEntity } from '../user/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserEntity | null> {
    let user;
    try {
      user = await this.userService.findOneByEmail(email, true);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }
      throw error;
    }
    const passwordMatches = await argon.verify(user.password, pass);
    if (user && passwordMatches) {
      return user;
    }
    return null;
  }

  async signToken(user: UserEntity): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '12h',
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
