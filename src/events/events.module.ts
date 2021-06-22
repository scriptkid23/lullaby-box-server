import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway, ChatGateway],
})
export class EventsModule {}
