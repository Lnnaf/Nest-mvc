import { Test, TestingModule } from '@nestjs/testing';
import { CouterSeqService } from './couter-seq.service';

describe('CouterSeqService', () => {
  let service: CouterSeqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouterSeqService],
    }).compile();

    service = module.get<CouterSeqService>(CouterSeqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
