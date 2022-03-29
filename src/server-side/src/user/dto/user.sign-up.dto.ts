import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UserSignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  givenName: string;

  @IsString()
  @IsOptional()
  familyName: string;
}
