import { Controller, Post, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BidsService } from './bids.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CurrentLot } from 'src/lots/current-lot.decorator';
import { Bid } from './bid.entity';
import { User } from 'src/auth/user.entity';
import { Lot } from 'src/lots/lot.entity';

@Controller('bids')
@UseGuards(AuthGuard())
export class BidsController {
  constructor(private bidsService: BidsService){}

  @Post()
  createBid(
    @Body('proposedPrice', ParseIntPipe) proposedPrice: number,
    @CurrentLot() lot: Lot,
    @CurrentUser() user: User,
  ): Promise<Bid> {
    return this.bidsService.createBid(proposedPrice, lot, user);
  }
}
