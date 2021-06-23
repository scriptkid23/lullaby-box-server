import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/decorate/public.decorate';
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/add-audio.dto';

@Controller('audio')
export class AudioController {
  constructor(private audioService: AudioService) {}
  @Public()
  @Post()
  async createAudio(@Body() audio: CreateAudioDto): Promise<any> {
    return this.audioService.createAudio(audio);
  }
}
