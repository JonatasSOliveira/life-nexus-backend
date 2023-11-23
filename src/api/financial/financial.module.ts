import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BankController } from './controllers/bank.controller';
import { BankService } from './services/bank.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BankController],
  providers: [BankService],
})
export class FinancialModule {}
