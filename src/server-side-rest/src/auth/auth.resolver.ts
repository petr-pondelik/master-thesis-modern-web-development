import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInputDto } from './graphql/sign-in-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlLocalAuthGuard } from './guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Mutation('signIn')
  @UseGuards(GqlLocalAuthGuard)
  async processSignIn(@Args('signInInput') input: SignInInputDto, @Context() context) {
    return {
      access_token: await this.authService.signToken(context.user),
    };
  }
}
