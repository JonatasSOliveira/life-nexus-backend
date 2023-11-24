import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user-repository';
import { BankRepository } from './repositories/bank-repository';
import { PrismaClientKnownRequestErrorFilter } from './exceptions/prisma-client-known-request-error.filter';

@Module({
  providers: [
    PrismaService,
    UserRepository,
    BankRepository,
    PrismaClientKnownRequestErrorFilter,
  ],
  exports: [
    UserRepository,
    BankRepository,
    PrismaClientKnownRequestErrorFilter,
  ],
})
export class DatabaseModule {}
