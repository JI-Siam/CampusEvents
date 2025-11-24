import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { beforeEach, describe, it } from 'node:test';

describe('StudentController', () => {
  let controller: StudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
    }).compile();

    controller = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
