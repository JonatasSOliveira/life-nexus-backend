import { Injectable } from '@nestjs/common';
import { Bank, Prisma } from '@prisma/client';
import { BankRepository } from 'src/database/repositories/bank-repository';

@Injectable()
export class BankService {
  constructor(private bankRepository: BankRepository) {}

  async findAll() {
    return await this.bankRepository.findAll();
  }

  async create(bank: Prisma.BankCreateInput): Promise<Bank> {
    return await this.bankRepository.create(bank);
  }
}
