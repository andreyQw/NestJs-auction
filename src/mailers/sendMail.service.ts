import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Lot } from '../lots/lot.entity';
import { User } from '../auth/user.entity';
import { Bid } from '../bids/bid.entity';

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendSignUpMail(): void {
    this.mailerService.sendMail({
      to: process.env.GOOGLE_USER,
      from: 'nest-js@gmail.com',
      subject: 'sendSignUpMail',
      text: 'sendSignUpMail text',
    });
  }

  public sendMailToTheLotWinner(
    lot: Lot,
    winerUser: User,
    bid: Bid,
    link = '#',
  ): void {
    this.mailerService.sendMail({
      to: winerUser.email,
      from: 'mailer.test000111@gmail.com',
      subject: `You are a winner of bids for ${lot.title}`,
      text: `${winerUser.firstName}, you are a winner in lot: ${lot.title}. Link to lot ${link}. Current price: ${bid.proposedPrice}.`,
    });
  }

  public sendMailToTheLotOwner(
    lot: Lot,
    winnerUser: User,
    bid: Bid,
    link = '#',
  ): void {
    this.mailerService.sendMail({
      to: lot.user.email,
      from: process.env.GOOGLE_USER,
      subject: `The lot ${lot.title} is closed`,
      text: `${winnerUser.firstName} bought your lot, ${lot.title} is closed. Current price: ${bid.proposedPrice}. Link to lot: ${link}`,
    });
  }
}
