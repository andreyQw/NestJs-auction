import { BadRequestException, Injectable } from '@nestjs/common';
import { BidRepository } from './bid.reository';
import { InjectRepository } from '@nestjs/typeorm';
import { Lot } from 'src/lots/lot.entity';
import { User } from 'src/auth/user.entity';
import { Bid } from './bid.entity';
import { LotStatus } from "../lots/lot-status.enum";

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(BidRepository)
    private bidReposytory: BidRepository,
  ){}

  async createBid(
    proposedPrice: number,
    lot: Lot,
    user: User,
  ): Promise<Bid> {
    if (lot.status !== LotStatus.IN_PROGRESS ) {
      throw new BadRequestException("Wrong lot status.")
    }

    const bid = await this.bidReposytory.createBid(proposedPrice, lot, user);

    if (bid.proposedPrice >= lot.estimatedPrice) {
      lot.status = LotStatus.CLOSED;
    }
    lot.currentPrice = proposedPrice;
    await lot.save();

    return bid;
  }
}
