import { Repository, EntityRepository } from "typeorm";
import { Bid } from "./bid.entity";
import { Lot } from "src/lots/lot.entity";
import { User } from "src/auth/user.entity";
import { BadRequestException } from "@nestjs/common";

@EntityRepository(Bid)
export class BidRepository extends Repository<Bid> {
  async createBid(
    proposedPrice: number,
    lot: Lot,
    user: User,
  ): Promise<Bid> {
    if (proposedPrice > lot.currentPrice) {
      const bid = new Bid();

      bid.proposedPrice = proposedPrice;
      bid.lot = lot;
      bid.user = user;

      await bid.save();

      return bid;
    } else {
      throw new BadRequestException(`Proposed price must by more than "${lot.currentPrice}"`);
    }
  }
}
