import { BadRequestException, Injectable } from '@nestjs/common';
import { BidRepository } from './bid.reository';
import { InjectRepository } from '@nestjs/typeorm';
import { Lot } from 'src/lots/lot.entity';
import { User } from 'src/auth/user.entity';
import { Bid } from './bid.entity';
import { LotStatus } from "../lots/lot-status.enum";
import {SendMailService} from '../mailers/sendMail.service';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(BidRepository)
    private bidReposytory: BidRepository,
    private sendMailService: SendMailService,
  ){}

  async createBid(
    proposedPrice: number,
    lot: Lot,
    user: User,
  ): Promise<Bid> {
    if (lot.status !== LotStatus.IN_PROGRESS ) {
      throw new BadRequestException("Wrong lot status.")
    }

    if (proposedPrice < lot.currentPrice ) {
      throw new BadRequestException(`Proposed price must be more then ${lot.currentPrice}`)
    }

    const bid = await this.bidReposytory.createBid(proposedPrice, lot, user);

    if (bid.proposedPrice >= lot.estimatedPrice) {
      lot.status = LotStatus.CLOSED;
      this.sendMails(lot, bid, user);
    }
    lot.currentPrice = proposedPrice;
    await lot.save();

    return bid;
  }

  async sendMails(lot, bid, user) {
    await this.sendMailService.sendMailToTheLotWinner(
      user.email,
      user.firstName,
      lot.title,
      bid.proposedPrice,
      `http://${process.env.HOST}:${process.env.PORT}/lots/${lot.id}`,
    );

    await this.sendMailService.sendEmailToTheLotOwner(
      lot.user.email,
      user.firstName,
      lot.title,
      bid.proposedPrice,
      `http://${process.env.HOST}:${process.env.PORT}/lots/${lot.id}`,
    );
  }
}
