import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { LotStatus } from "../lot-status.enum";

export class LotStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    LotStatus.PENDING,
    LotStatus.IN_PROGRESS,
    LotStatus.CLOSED,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('metadata', metadata);

    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invavid status`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);
    console.log('idx', idx);

    return idx !== -1
  }
}
