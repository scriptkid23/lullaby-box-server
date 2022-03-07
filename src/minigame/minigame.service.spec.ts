import { Test, TestingModule } from '@nestjs/testing';
import { MinigameService } from './minigame.service';

describe('MinigameService', () => {
  let service: MinigameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinigameService],
    }).compile();

    service = module.get<MinigameService>(MinigameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
