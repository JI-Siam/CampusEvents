import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class StudentNamePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Name must be a string.');
    }
    const testedName = value.trim();
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (!nameRegex.test(testedName)) {
      throw new BadRequestException(
        'Name must contain only alphabets and single spaces between words.'
      );
    }

    return testedName;
  }
}
