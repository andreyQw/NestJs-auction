import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BidRepository } from './bid.reository';
import { SendMailService } from '../mailers/sendMail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BidRepository]),
    AuthModule,
    SendMailService,
  ],
  controllers: [BidsController],
  providers: [BidsService, SendMailService],
})
export class BidsModule {}
