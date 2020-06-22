import { LotStatus } from "../lot-status.enum";
import { IsString, IsNotEmpty, IsDate, Min, MinDate, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class CreateLotDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  status: LotStatus = LotStatus.PENDING;

  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  currentPrice: number;

  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  estimatedPrice: number;

  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  lotStartTime: Date;

  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  lotEndTime: Date;

  image: string;
}
