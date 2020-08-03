import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Lot } from '../lots/lot.entity';

export const CurrentLot = createParamDecorator(
  async (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const lotID = req.body.lotID;

    const lot = await Lot.findOne(lotID);

    if (!lot) {
      throw new NotFoundException(`Lot with ID "${lotID}" not found`);
    }

    return lot;
  },
);
