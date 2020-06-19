import { EntityRepository, Repository } from 'typeorm';
import { Lot } from './lot.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { User } from 'src/auth/user.entity';
import { LotStatus } from './lot-status.enum';
import { GetLotsFilterDto } from './dto/get-lots-filter.dto';
import { NotFoundException } from '@nestjs/common';
import {UpdateLotDto} from "./dto/update-lot.dto";

@EntityRepository(Lot)
export class LotRepository extends Repository<Lot> {
  async getLots(
    filterDto: GetLotsFilterDto,
    user: User
  ): Promise<Lot[]> {
    const {status, createdAt, lotStartTime, lotEndTime, myLots} = filterDto;
    console.log('myLots', typeof(myLots));

    const query = this.createQueryBuilder('lot');

    if (user) {
      query.where('lot.userId = :userId', { userId: user.id })
    }

    if (status) {
      query.andWhere('lot.status = :status', { status });
    }

    return await query.getMany();
  }

  async getOwnLot(id: number, user: User){
    const found = await this.findOne({where: {id, userId: user.id}});

    if (!found) {
      throw new NotFoundException(`Lot with ID "${id}" not found`)
    }

    return found;
  }

  async createLot(
    createLotDto: CreateLotDto,
    user: User
  ){
    const { title, currentPrice, estimatedPrice, lotStartTime, lotEndTime, description } = createLotDto;

    const lot = new Lot();
    lot.title = title;
    lot.description = description;
    lot.status = LotStatus.PENDING;
    lot.createdAt = new Date();
    lot.currentPrice = currentPrice;
    lot.estimatedPrice = estimatedPrice;
    lot.lotStartTime = lotStartTime;
    lot.lotEndTime = lotEndTime;
    lot.image = 'string';
    lot.user = user;

    await lot.save();

    return lot;
  }

  async updateLot(
    id: number, updateLotDto: UpdateLotDto, user: User
  ){
    const {title, status, currentPrice, estimatedPrice, lotStartTime, lotEndTime, description } = updateLotDto;
    const lot = await this.getOwnLot(id, user);
    console.log('serv', lot);

    if (!lot) {
      throw new NotFoundException(`Lot with ID "${id}" not found`)
    }

    lot.title = title;
    lot.status = status;
    lot.currentPrice = currentPrice;
    lot.estimatedPrice = estimatedPrice;
    lot.lotStartTime = lotStartTime;
    lot.lotEndTime = lotEndTime;
    lot.description = description;

    await lot.save();

    return lot;
  }
}
