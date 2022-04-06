import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { SignInInput } from '../../graphql/graphql';

export class SignInInputDto extends SignInInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}