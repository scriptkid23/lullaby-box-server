import { Test, TestingModule } from '@nestjs/testing';
import { MinigameController } from './minigame.controller';

describe('MinigameController', () => {
  let controller: MinigameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinigameController],
    }).compile();

    controller = module.get<MinigameController>(MinigameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
