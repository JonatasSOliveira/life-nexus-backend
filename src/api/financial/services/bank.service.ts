import { Injectable } from '@nestjs/common';
import { Bank } from '@prisma/client';
import { BankRepository } from 'src/database/repositories/bank-repository';
import { BankCreateDto } from '../dtos/bank-create.dto';

@Injectable()
export class BankService {
  constructor(private bankRepository: BankRepository) {}

  async findAll() {
    return await this.bankRepository.findAll();
  }

  async create(bank: BankCreateDto): Promise<Bank> {
    return await this.bankRepository.create(bank);
  }
}
