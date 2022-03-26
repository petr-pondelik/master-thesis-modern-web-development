import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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

  async signToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
