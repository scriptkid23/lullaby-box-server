import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';

@WebSocketGateway()
@UseGuards(WsAuthGuard)
export class AudioGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('SEND_SET_TRACK_INDEX')
  listenSetTrackIndex(@MessageBody() data: string) {
    console.log(data);
    this.server.sockets.emit('RECEIVER_SET_TRACK_INDEX', data);
  }
  @SubscribeMessage('SEND_ADD_TRACK')
  listenAddTrack(@MessageBody() data: string) {
    console.log(data);
    this.server.sockets.emit('RECEIVER_ADD_TRACK', data);
  }
}
