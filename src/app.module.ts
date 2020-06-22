import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { LotsModule } from './lots/lots.module';
import { BidsModule } from './bids/bids.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    LotsModule,
    BidsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
