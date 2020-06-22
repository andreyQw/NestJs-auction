import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BidRepository } from './bid.reository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BidRepository]),
    AuthModule,
  ],
  controllers: [BidsController],
  providers: [BidsService]
})
export class BidsModule {}
