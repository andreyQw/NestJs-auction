import {IsDate, IsNotEmpty, IsString, Min, MinDate} from "class-validator";
import {LotStatus} from "../lot-status.enum";

export class UpdateLotDto {
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
