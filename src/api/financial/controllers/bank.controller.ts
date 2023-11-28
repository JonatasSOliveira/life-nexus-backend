import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { BankService } from '../services/bank.service';
import { Bank } from '@prisma/client';
import { BankCreateDto } from '../dtos/bank-create.dto';
import { PrismaClientKnownRequestErrorFilter } from 'src/database/exceptions/prisma-client-known-request-error.filter';

@Controller('banks')
export class BankController {
  constructor(private bankService: BankService) {}

  @Get()
  async findAll(): Promise<Bank[]> {
    return await this.bankService.findAll();
  }

  @Post()
  @UseFilters(PrismaClientKnownRequestErrorFilter)
  async create(@Body() bank: BankCreateDto): Promise<Bank> {
    return await this.bankService.create(bank);
  }
}
