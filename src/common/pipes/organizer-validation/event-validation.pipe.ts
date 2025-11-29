import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class EventValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value.title || !value.description) {
      throw new BadRequestException('Title & Description required');
    }
    return value;
  }
}
