import { Controller, Get } from '@nestjs/common';
import { MinigameService } from './minigame.service';

@Controller('minigame')
export class MinigameController {
  constructor(private miniGameService: MinigameService) {}
  @Get('/common')
  async getMiniGameCommon(): Promise<any> {
    return this.miniGameService.getMiniGameCommon();
  }
  @Get('/history')
  async getMiniGameHistory(): Promise<any> {
    return this.miniGameService.getMiniGameHistory();
  }
}
