import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
