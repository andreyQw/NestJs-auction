import { Test, TestingModule } from '@nestjs/testing';
import { LotsController } from './lots.controller';

describe('Lots Controller', () => {
  let controller: LotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LotsController],
      providers: [{ provide: 'LotsService', useValue: {} }],
    }).compile();

    controller = module.get<LotsController>(LotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
