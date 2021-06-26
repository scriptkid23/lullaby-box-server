import { Inject, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
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
    this.server.sockets.to(data.roomId).emit('RECEIVER_MESSAGE', data);
  }
  @SubscribeMessage('SEND_IS_TYPING')
  listenIsTyping(@MessageBody() data: any) {
    this.server.sockets.to(data.roomId).emit('RECEIVER_IS_TYPING', data);
  }
  @SubscribeMessage('JOIN_ROOM')
  listenJoinRoom(
    @MessageBody() data: JoinRoomDto | any,
    @ConnectedSocket() client: any,
  ) {
    console.log(data);
    if (data.roomId && data.reconnect) {
      client.join(data.roomId, (error) => {
        if (!error)
          this.server.sockets.to(data.roomId).emit('RECEIVER_JOIN_ROOM', data);
      });
    } else {
      client.join(data.roomId, (error) => {
        if (!error)
          this.server.sockets.to(data.roomId).emit('RECEIVER_JOIN_ROOM', data);
      });
    }
  }
  @SubscribeMessage('LEAVE_ROOM')
  listenLeaveRoom(
    @MessageBody() data: LeaveRoomDto,
    @ConnectedSocket() client: any,
  ) {
    console.log(data);
    this.roomService.leaveRoom(data);
    this.server.sockets.to(data.roomId).emit('RECEIVER_LEAVE_ROOM', data);
    client.leave(data.roomId);
  }
}
