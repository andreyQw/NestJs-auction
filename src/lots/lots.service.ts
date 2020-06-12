import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LotRepository} from "./lot.repository";
import { CreateLotDto } from './dto/create-lot.dto';
import { User } from 'src/auth/user.entity';
import { GetLotsFilterDto } from './dto/get-lots-filter.dto';
import { Lot } from './lot.entity';
import { LotStatus } from './lot-status.enum';
import {UpdateLotDto} from "./dto/update-lot.dto";

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(LotRepository)
    private lotRepository: LotRepository,
  ){}

  async getLots(
    filterDto: GetLotsFilterDto,
    user: User,
  ): Promise<Lot[]> {
    return this.lotRepository.getLots(filterDto, user);
  }

  async getLotById(id: number,): Promise<Lot> {
    const found = await this.lotRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Lot with ID "${id}" not found`);
    }

    return found;
  }

  async getOwnLotById(
    id: number,
    user: User,
  ): Promise<Lot> {
    const found = await this.lotRepository.getOwnLot(id, user);

    if (!found) {
      throw new NotFoundException(`Lot with ID "${id}" not found`);
    }

    return found;
  }

  async createLot(
    createLotDto: CreateLotDto,
    user: User
  ): Promise<Lot> {
    return this.lotRepository.createLot(createLotDto, user);
  }

  async updateLot(
    id: number,
    updateLotDto: UpdateLotDto,
    user: User,
  ){
    return this.lotRepository.updateLot(id, updateLotDto, user);
  }

  async deleteLot(
    id: number,
    user: User
  ): Promise<void> {
    const result = await this.lotRepository.delete({id, userId: user.id})

    if (result.affected === 0) {
      throw new NotFoundException(`Lot with ID "${id}" not found`);
    }
  }
}
