import { LotStatus } from "../lot-status.enum";
import { IsString, IsNotEmpty, IsDate, Min, MinDate } from "class-validator";

export class CreateLotDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  status: LotStatus = LotStatus.PENDING;

  @IsNotEmpty()
  @Min(0)
  currentPrice: number;

  @IsNotEmpty()
  estimatedPrice: number;

  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  lotStartTime: Date;

  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  lotEndTime: Date;

  image: string;
}
