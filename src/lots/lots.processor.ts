import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { LotRepository } from './lot.repository';
import { LotStatus } from './lot-status.enum';

@Processor('lots')
export class LotsProcessor {
  constructor(
    private lotRepository: LotRepository
  ) {}

  @Process('startLot')
  async startLot(job: Job<any>) {
    console.log(`Processing job ${job.id} of type ${job.name}`);

    const { lotId } = job.data;

    const lot = await this.lotRepository.updateLotStatus(lotId, LotStatus.IN_PROGRESS);

    console.log(`LotJob status AFTER updated ${lot.status}`);
  }

  @Process('closeLot')
  async closeLot(job: Job<any>) {
    console.log(`Processing closeLot job ${job.id} of type ${job.name}`);

    const { lotId } = job.data;

    const lot = await this.lotRepository.findOne(lotId);

    if (lot.status === LotStatus.IN_PROGRESS) {
      lot.status = LotStatus.CLOSED;
      await lot.save();
    }

    console.log(`LotJob status AFTER updated ${lot.status}`);
  }
}
