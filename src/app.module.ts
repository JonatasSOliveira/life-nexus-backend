import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    RouterModule.register([{ path: 'api/user', module: UserModule }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
