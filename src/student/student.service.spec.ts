import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { beforeEach, describe, it} from 'node:test';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
