import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class EventValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value.eventTitle || !value.eventDescription) {
      throw new BadRequestException('Title & Description required');
    }
    return value;
  }
}
