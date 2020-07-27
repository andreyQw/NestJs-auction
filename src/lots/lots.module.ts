import { Module } from '@nestjs/common';
import { LotsController } from './lots.controller';
import { LotsService } from './lots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotRepository } from './lot.repository';
import { AuthModule } from 'src/auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { LotsProcessor } from './lots.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([LotRepository]),
    BullModule.registerQueue({
      name: 'lots',
      redis: {
        host: process.env.HOST,
        port: 6379,
        // host: process.env.REDIS_HOST,
        // port: parseInt(process.env.REDIS_PORT),
      },
    }),
    AuthModule,
  ],
  controllers: [LotsController],
  providers: [LotsService, LotsProcessor],
})
export class LotsModule {}
