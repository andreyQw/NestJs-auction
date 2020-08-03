import {
  Controller,
  Post,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BidsService } from './bids.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { CurrentLot } from '../lots/current-lot.decorator';
import { Bid } from './bid.entity';
import { User } from '../auth/user.entity';
import { Lot } from '../lots/lot.entity';

@Controller('bids')
@UseGuards(AuthGuard())
export class BidsController {
  constructor(private bidsService: BidsService) {}

  @Post()
  createBid(
    @Body('proposedPrice', ParseIntPipe) proposedPrice: number,
    @CurrentLot() lot: Lot,
    @CurrentUser() user: User,
  ): Promise<Bid> {
    return this.bidsService.createBid(proposedPrice, lot, user);
  }
}
