import { PipeTransform, ArgumentMetadata, Injectable } from "@nestjs/common";

@Injectable()
export class TransformBooleanPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata){
    console.log(value);

    if (value === 'true' || value === true || value === 1 || value === '1') {
      return true;
    } else {
      return false;
    }
  }
}
