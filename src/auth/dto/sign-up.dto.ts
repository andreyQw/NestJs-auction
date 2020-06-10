import { IsString, MinLength, IsNotEmpty, IsEmail } from "class-validator";


export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  firstName: string;

  lastName: string;

  birthday: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
