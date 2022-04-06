import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlLocalAuthGuard } from './guard';
import { SignInDto } from './graphql';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation('signIn')
  @UseGuards(GqlLocalAuthGuard)
  async processSignIn(@Args('content') content: SignInDto, @Context() context) {
    return {
      access_token: await this.authService.signToken(context.user),
    };
  }
}
