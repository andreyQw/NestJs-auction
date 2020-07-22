import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { LotsModule } from './lots/lots.module';
import { BidsModule } from './bids/bids.module';
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerModuleConfig } from './config/mailer-module-config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRootAsync(mailerModuleConfig),
    AuthModule,
    LotsModule,
    BidsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
