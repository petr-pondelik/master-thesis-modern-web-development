import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { SignInContent } from '../../graphql';

export class SignInDto extends SignInContent {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
