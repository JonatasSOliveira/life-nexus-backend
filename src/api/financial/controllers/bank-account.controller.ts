import { Body, Controller, Post, Req } from '@nestjs/common';
import { BankAccount } from '@prisma/client';
import { BankAccountService } from '../services/bank-account.service';
import { BankAccountCreateDto } from '../dtos/bank-account-create.dto';
import { RequestWithAuth } from 'src/api/auth/types/request';

@Controller('bank-account')
export class BankAccountController {
  constructor(private bankAccountService: BankAccountService) {}

  @Post()
  async create(
    @Body() bankAccountCreateDto: BankAccountCreateDto,
    @Req() { user }: RequestWithAuth,
  ): Promise<BankAccount> {
    return await this.bankAccountService.create(bankAccountCreateDto, user);
  }
}
