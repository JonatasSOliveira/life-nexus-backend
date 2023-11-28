import { IsNotEmpty, IsInt } from 'class-validator';

export class BankCreateDto {
  @IsNotEmpty()
  ispb: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  code: number;

  @IsNotEmpty()
  full_name: string;
}
