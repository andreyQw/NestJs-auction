import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

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
    email,
    name,
    lotTitle,
    proposedPrice,
    link = '#',
  ): void {
    this.mailerService.sendMail({
      to: email,
      from: 'mailer.test000111@gmail.com',
      subject: `You are a winner of bids for ${lotTitle}`,
      text: `${name}, you are a winner in lot: ${lotTitle}. Link to lot ${link}. Current price: ${proposedPrice}.`,
    });
  }

  public sendEmailToTheLotOwner(
    email,
    name,
    lotTitle,
    price,
    link = '#',
  ): void {
    this.mailerService.sendMail({
      to: email,
      from: process.env.GOOGLE_USER,
      subject: `The lot ${lotTitle} is closed`,
      text: `${name}, your lot ${lotTitle} is closed. Current price: ${price}. Link to lot: ${link}`,
    });
  }
}
