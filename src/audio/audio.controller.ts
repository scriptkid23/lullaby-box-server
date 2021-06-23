import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/decorate/public.decorate';
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/add-audio.dto';
@Public()
@Controller('audio')
export class AudioController {
  constructor(private audioService: AudioService) {}

  @Post()
  async createAudio(@Body() audio: CreateAudioDto): Promise<any> {
    return this.audioService.createAudio(audio);
  }

  @Get()
  async findAudio(@Query('search') name: string): Promise<any> {
    return this.audioService.findAudio(name);
  }
}
