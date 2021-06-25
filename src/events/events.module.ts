import { Module } from '@nestjs/common';
import { RoomModule } from 'src/room/room.module';
import { RoomService } from 'src/room/room.service';
import { AudioGateway } from './audio.gateway';
import { ChatGateway } from './chat.gateway';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway, ChatGateway, AudioGateway],
  imports: [RoomModule],
})
export class EventsModule {}
