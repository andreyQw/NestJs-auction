import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LotRepository } from './lot.repository';
import { CreateLotDto } from './dto/create-lot.dto';
import { User } from 'src/auth/user.entity';
import { GetLotsFilterDto } from './dto/get-lots-filter.dto';
import { Lot } from './lot.entity';
import { UpdateLotDto } from './dto/update-lot.dto';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import * as moment from 'moment';
import { LotStatus } from './lot-status.enum';

@Injectable()
export class LotsService {
  constructor(
    @InjectRepository(LotRepository) private lotRepository: LotRepository,
    @InjectQueue('lots') private lotsQueue: Queue,
  ) {}

  async getLots(filterDto: GetLotsFilterDto, user: User): Promise<Lot[]> {
    return this.lotRepository.getLots(filterDto, user);
  }

  async getLotById(id: number): Promise<Lot> {
    const found = await this.lotRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Lot with ID "${id}" not found`);
    }

    return found;
  }

  async createLot(createLotDto: CreateLotDto, user: User): Promise<Lot> {
    const lot = await this.lotRepository.createLot(createLotDto, user);
    await this.addLotJobs(lot);

    return lot;
  }

  async updateLot(
    id: number,
    updateLotDto: UpdateLotDto,
    user: User,
  ): Promise<Lot> {
    const lot = await this.lotRepository.getOwnLot(id, user);

    if (lot.status !== LotStatus.PENDING) {
      throw new NotAcceptableException('Lot must be in PENDING status');
    }

    await this.lotRepository.updateLot(lot, updateLotDto);
    await this.removeLotJobs(lot);
    await this.addLotJobs(lot);

    return lot;
  }

  async deleteLot(id: number, user: User): Promise<void> {
    const lot = await this.lotRepository.getOwnLot(id, user);

    if (lot.status !== 'PENDING') {
      throw new NotAcceptableException('Lot must be in PENDING status');
    }

    try {
      await this.lotRepository.delete(lot.id);
      await this.removeLotJobs(lot);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addLotJobs(lot: Lot): Promise<void> {
    const currentTime = moment.utc();
    const startTime = moment
      .utc(lot.lotStartTime)
      .diff(currentTime, 'milliseconds');
    const closeTime = moment
      .utc(lot.lotEndTime)
      .diff(currentTime, 'milliseconds');

    await this.lotsQueue.add(
      'startLot',
      { lotId: lot.id },
      { delay: startTime, jobId: `startLot${lot.id}` },
    );
    await this.lotsQueue.add(
      'closeLot',
      { lotId: lot.id },
      { delay: closeTime, jobId: `closeLot${lot.id}` },
    );
  }

  async removeLotJobs(lot: Lot): Promise<void> {
    const startJob: Job = await this.lotsQueue.getJob(`startLot${lot.id}`);
    const closeJob: Job = await this.lotsQueue.getJob(`closeLot${lot.id}`);

    if (startJob) {
      await startJob.remove();
    }
    if (closeJob) {
      await closeJob.remove();
    }
  }
}
