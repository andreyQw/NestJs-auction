import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";
import { Lot } from "src/lots/lot.entity";

export const CurrentLot = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const lotID = req.body.lotID;

  const lot = Lot.findOne(lotID);

  if (!lot) {
    throw new NotFoundException(`Lot with ID "${lotID}" not found`)
  }

  return lot;
});
