import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  OneToMany,
} from 'typeorm';
import { LotStatus } from './lot-status.enum';
import { User } from '../auth/user.entity';
import { Bid } from 'src/bids/bid.entity';

@Entity()
@Index(['createdAt'])
export class Lot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({ nullable: false, default: LotStatus.PENDING })
  status: LotStatus;

  @Column({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Column('decimal', { nullable: false, precision: 19, scale: 2 })
  currentPrice: number;

  @Column('decimal', { nullable: false, precision: 19, scale: 2 })
  estimatedPrice: number;

  @Column({ nullable: false })
  lotStartTime: Date;

  @Column({ nullable: false })
  lotEndTime: Date;

  @Column()
  image: string;

  @ManyToOne((type) => User, (user) => user.lots, { eager: false })
  user: User;

  @Column()
  userId: number;

  @OneToMany((type) => Bid, (bid) => bid.lot, { eager: true })
  bids: Bid[];
}
