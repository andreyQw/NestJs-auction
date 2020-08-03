import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: 'AuthService', useValue: {} },
        { provide: 'UserRepository', useValue: {} },
        { provide: 'JwtService', useValue: {} },
        { provide: 'SendMailService', useValue: {} },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
