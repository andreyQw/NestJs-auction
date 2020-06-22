import { IsDate, IsNotEmpty, IsString, Min, MinDate, IsEnum, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer"
import { LotStatus } from "../lot-status.enum";

export class UpdateLotDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(LotStatus)
  @IsOptional()
  status: LotStatus;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  currentPrice: number;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  estimatedPrice: number;

  @IsDate()
  @IsOptional()
  @MinDate(new Date())
  @Type(() => Date)
  lotStartTime: Date;

  @IsDate()
  @IsOptional()
  @MinDate(new Date())
  @Type(() => Date)
  lotEndTime: Date;

  image: string;
}
