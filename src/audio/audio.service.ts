import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Audio, AudioDocument } from 'src/schemas/audio.schema';
import { CreateAudioDto } from './dto/add-audio.dto';

@Injectable()
export class AudioService {
  constructor(
    @InjectModel(Audio.name) private audioModel: Model<AudioDocument>,
  ) {}
  async createAudio(audio: CreateAudioDto): Promise<any> {
    const newAudio = new this.audioModel(audio);
    return newAudio.save();
  }
}
