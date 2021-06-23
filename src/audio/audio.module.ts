import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Audio, AudioSchema } from 'src/schemas/audio.schema';

@Module({
  providers: [AudioService],
  controllers: [AudioController],
  imports: [
    MongooseModule.forFeature([{ name: Audio.name, schema: AudioSchema }]),
  ],
})
export class AudioModule {}
