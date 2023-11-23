import { Bank, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BankRepository {
  constructor(private prismaService: PrismaService) {}

  async create(bank: Prisma.BankCreateInput): Promise<Bank> {
    return await this.prismaService.bank.create({ data: bank });
  }

  async findAll(): Promise<Bank[]> {
    return await this.prismaService.bank.findMany();
  }
}
