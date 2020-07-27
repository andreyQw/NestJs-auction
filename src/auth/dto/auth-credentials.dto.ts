import { IsString, MinLength, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
