import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpRequestDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
