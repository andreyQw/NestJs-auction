import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, Index , OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { Lot } from "../lots/lot.entity";
import { Bid } from "src/bids/bid.entity";

@Entity()
@Unique(['email', 'phone'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  birthday: Date;

  @Column()
  password: string;

  @Column({ nullable: true })
  salt: string;

  @OneToMany(type => Lot, lot => lot.user, { eager: true })
  lots: Lot[];

  @OneToMany(type => Bid, bid => bid.user, { eager: true })
  bids: Bid[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
