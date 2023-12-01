import { UserRepository } from 'src/database/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { BankAccount } from '@prisma/client';
import { BankRepository } from 'src/database/repositories/bank-repository';
import { BankAccountCreateDto } from '../dtos/bank-account-create.dto';
import { UserTokenPayload } from 'src/api/auth/types/user-token-payload';

@Injectable()
export class BankAccountService {
  constructor(
    private bankRepository: BankRepository,
    private userRepository: UserRepository,
  ) {}

  public async create(
    bankAccountCreateDto: BankAccountCreateDto,
    userTokenPayload: UserTokenPayload,
  ): Promise<BankAccount> {
    const user = await this.userRepository.findById(userTokenPayload.id);
    return this.bankRepository.create(bankAccountCreateDto);
  }
}
