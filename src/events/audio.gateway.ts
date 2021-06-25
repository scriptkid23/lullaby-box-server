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
import { AddTrackDto } from 'src/room/dto/add-track.dto';
import { RoomService } from 'src/room/room.service';

@WebSocketGateway()
export class AudioGateway {
  @WebSocketServer()
  server: Server;

  constructor(private roomService: RoomService) {}
  @SubscribeMessage('SEND_SET_TRACK_INDEX')
  listenSetTrackIndex(@MessageBody() data) {
    console.log(data);
    this.server.sockets.to(data.roomId).emit('RECEIVER_SET_TRACK_INDEX', data);
  }
  @SubscribeMessage('SEND_ADD_TRACK')
  listenAddTrack(@MessageBody() data: AddTrackDto) {
    console.log(data);
    this.roomService.addtrack(data);
    this.server.sockets.to(data.roomId).emit('RECEIVER_ADD_TRACK', data);
  }
  @SubscribeMessage('SEND_EVENT_PLAY')
  listenEventPlay(@MessageBody() data) {
    console.log(data);
    this.server.sockets.to(data.roomId).emit('RECEIVER_EVENT_PLAY', data);
  }
  @SubscribeMessage('SEND_SET_TRACK_PROGRESS')
  listenSendSetTrackProgress(@MessageBody() data) {
    console.log(data);
    this.server.sockets
      .to(data.roomId)
      .emit('RECEIVER_SET_TRACK_PROGRESS', data);
  }
}
