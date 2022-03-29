import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthSignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
