import { Module } from '@nestjs/common';
import { AudioGateway } from './audio.gateway';
import { ChatGateway } from './chat.gateway';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway, ChatGateway, AudioGateway],
})
export class EventsModule {}
