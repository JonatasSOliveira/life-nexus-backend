import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { FinancialModule } from './financial/financial.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    FinancialModule,
    RouterModule.register([
      { path: 'api/user', module: UserModule },
      { path: 'api/auth', module: AuthModule },
      { path: 'api/financial', module: FinancialModule },
    ]),
  ],
})
export class ApiModule {}
