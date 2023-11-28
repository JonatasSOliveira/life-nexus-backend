import { IsNotEmpty, IsInt } from 'class-validator';

export class BankAccountCreateDto {
  @IsNotEmpty()
  @IsInt()
  bank_id: number;

  @IsNotEmpty()
  nickname: string;
}
