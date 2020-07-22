import { EntityRepository, Repository } from 'typeorm';
import { Lot } from './lot.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { User } from 'src/auth/user.entity';
import { LotStatus } from './lot-status.enum';
import { GetLotsFilterDto } from './dto/get-lots-filter.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UpdateLotDto } from "./dto/update-lot.dto";

@EntityRepository(Lot)
export class LotRepository extends Repository<Lot> {
  async getLots(
    filterDto: GetLotsFilterDto,
    user: User
  ): Promise<Lot[]> {
    const {status, createdAt, lotStartTime, lotEndTime, myLots} = filterDto;

    const query = this.createQueryBuilder('lot');

    if (myLots === true) { query.andWhere('lot.userId = :userId', { userId: user.id }) }

    if (status) { query.andWhere('lot.status = :status', { status }) }

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

    try {
      await lot.save();
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create a lot. Data: ${CreateLotDto}`, error.stack);
    }

    return lot;
  }

  async updateLot(
    lot: Lot, updateLotDto: UpdateLotDto
  ){
    const {title, status, currentPrice, estimatedPrice, lotStartTime, lotEndTime, description } = updateLotDto;
    // const lot = await this.getOwnLot(id, user);

    if (!lot) {
      throw new NotFoundException(`Lot with ID "${lot.id}" not found`)
    }

    lot.title = title;
    lot.status = status;
    lot.currentPrice = currentPrice;
    lot.estimatedPrice = estimatedPrice;
    lot.lotStartTime = lotStartTime;
    lot.lotEndTime = lotEndTime;
    lot.description = description;

    try {
      await lot.save();
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update a lot. Data: ${updateLotDto}`, error.stack);
    }

    return lot;
  }

  async updateLotStatus(id: number, lotStatus: LotStatus) {
    const lot = await this.findOne(id);

    if (!lot) {
      throw new NotFoundException(`Lot with ID "${id}" not found`)
    }

    lot.status = lotStatus;
    await lot.save();

    return lot;
  }
}
