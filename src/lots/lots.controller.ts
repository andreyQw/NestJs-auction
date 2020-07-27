import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateLotDto } from './dto/create-lot.dto';
import { User } from 'src/auth/user.entity';
import { LotsService } from './lots.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Lot } from './lot.entity';
import { GetLotsFilterDto } from './dto/get-lots-filter.dto';
import { UpdateLotDto } from './dto/update-lot.dto';

@Controller('lots')
@UseGuards(AuthGuard())
export class LotsController {
  constructor(private lotsService: LotsService) {}
  @Get()
  getLots(
    @Query(ValidationPipe) filterDto: GetLotsFilterDto,
    @CurrentUser() user: User,
  ): Promise<Lot[]> {
    console.log('getLots filterDto:', filterDto);

    return this.lotsService.getLots(filterDto, user);
  }

  @Get('/:id')
  getLotById(@Param('id', ParseIntPipe) id: number): Promise<Lot> {
    return this.lotsService.getLotById(id);
  }

  @Post()
  createLot(
    @Body() createLotDto: CreateLotDto,
    @CurrentUser() user: User,
  ): Promise<Lot> {
    console.log('createLot createLotDto:', createLotDto);

    return this.lotsService.createLot(createLotDto, user);
  }

  @Put('/:id')
  updateLot(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLotDto: UpdateLotDto,
    @CurrentUser() user: User,
  ): Promise<Lot> {
    return this.lotsService.updateLot(id, updateLotDto, user);
  }

  @Delete('/:id')
  deleteLot(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    return this.lotsService.deleteLot(id, user);
  }
}
