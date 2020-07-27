import { Test, TestingModule } from '@nestjs/testing';
import { LotsService } from './lots.service';
import { LotRepository } from './lot.repository';

const mockLotRepo = () => ({
  getLots: jest.fn(),
});

describe('LotsService', () => {
  let lotsService: LotsService;
  let lotRepository: LotRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LotsService,
        { provide: LotRepository, useFactory: mockLotRepo },
      ],
    }).compile();

    lotsService = module.get<LotsService>(LotsService);
    lotRepository = module.get<LotRepository>(LotRepository);
  });

  it('should be defined', () => {
    expect(lotsService).toBeDefined();
  });

  describe('getLots', () => {
    it('gets all lots', () => {
      const filterDto = null;
      const user = null;

      expect(lotRepository.getLots).not.toHaveBeenCalled();

      lotsService.getLots(filterDto, user);
      expect(lotRepository.getLots).toHaveBeenCalled();
    });
  });
});
