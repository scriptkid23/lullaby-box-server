import { Inject, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';
import { AddMessageDto } from 'src/room/dto/add-message.dto';
import { JoinRoomDto } from 'src/room/dto/join-room.dto';
import { LeaveRoomDto } from 'src/room/dto/leave-room.dto';
import { RoomService } from 'src/room/room.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private roomService: RoomService) {}
  @SubscribeMessage('SEND_MESSAGE')
  listenMessages(@MessageBody() data: AddMessageDto) {
    console.log(data);
    this.roomService.addMessage(data);
    this.server.sockets.to(data.roomId).emit(data);
  }
  @SubscribeMessage('JOIN_ROOM')
  listenJoinRoom(@MessageBody() data: JoinRoomDto) {
    console.log(data);
    this.roomService.joinRoom(data);
    this.server.sockets.to(data.roomId).emit(data);
  }
  @SubscribeMessage('LEAVE_ROOM')
  listenLeaveRoom(@MessageBody() data: LeaveRoomDto) {
    console.log(data);
    this.roomService.leaveRoom(data);
    this.server.sockets.to(data.roomId).emit(data);
  }
}
