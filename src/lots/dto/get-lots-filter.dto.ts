import { LotStatus } from '../lot-status.enum';
import { IsOptional, IsIn, IsEnum, IsDate } from 'class-validator';

export class GetLotsFilterDto {
  @IsOptional()
  @IsEnum(LotStatus)
  status: LotStatus;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  lotStartTime: Date;

  @IsOptional()
  @IsDate()
  lotEndTime: Date;

  @IsOptional()
  myLots: boolean;
}
