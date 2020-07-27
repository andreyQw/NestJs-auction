import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Lot } from 'src/lots/lot.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Bid extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { nullable: false, precision: 19, scale: 2 })
  proposedPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => Lot, (lot) => lot.bids, { eager: false })
  lot: Lot;

  @ManyToOne((type) => User, (user) => user.bids, { eager: false })
  user: User;
}
