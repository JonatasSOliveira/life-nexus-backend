import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankRepository } from './repositories/bank-repository';
import { PrismaClientKnownRequestErrorFilter } from './exceptions/prisma-client-known-request-error.filter';

@Module({
  providers: [
    PrismaService,
    BankRepository,
    PrismaClientKnownRequestErrorFilter,
  ],
  exports: [PrismaService, BankRepository, PrismaClientKnownRequestErrorFilter],
})
export class DatabaseModule {}
