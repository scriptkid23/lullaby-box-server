import { CreateEventDto } from './dto/create-event.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/decorate/public.decorate';
import { MinigameService } from './minigame.service';
@Public()
@Controller('minigame')
export class MinigameController {
  constructor(private readonly miniGameService: MinigameService) {}
  @Get('/:id')
  async getMiniGameCommon(@Param('id') eventId: string): Promise<any> {
    return this.miniGameService.getMiniGameCommon(eventId);
  }
  @Post('/create')
  async createEvent(@Body() input: CreateEventDto): Promise<any> {
    return this.miniGameService.createEvent(input.eventId);
  }
  @Get()
  async getMiniGameHistory(): Promise<any> {
    return this.miniGameService.getMiniGameHistory();
  }
}
