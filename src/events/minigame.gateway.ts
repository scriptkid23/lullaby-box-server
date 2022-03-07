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
import { MinigameService } from 'src/minigame/minigame.service';
import { AddMessageDto } from 'src/room/dto/add-message.dto';
import { JoinRoomDto } from 'src/room/dto/join-room.dto';
import { LeaveRoomDto } from 'src/room/dto/leave-room.dto';
import { RoomService } from 'src/room/room.service';

@WebSocketGateway()
export class MiniGameGateway {
  @WebSocketServer()
  server: Server;
  constructor(private miniGameService: MinigameService) {}
  @SubscribeMessage('SEND_OPEN_CELL')
  async listenMessages(@MessageBody() data: any) {
    let response = await this.miniGameService.openCell(data);
    if (response) {
      this.server.sockets.to(data.roomId).emit('RECEIVER_OPEN_CELL', response);
      this.server.sockets.to(data.roomId).emit('RECEIVER_HISTORY', response);
    }
  }
  @SubscribeMessage('SEND_TOTAL_SUPPLY')
  async listenIsTyping(@MessageBody() data: any) {
    let response = await this.miniGameService.updateTotalSupply(data);
    if (response) {
      this.server.sockets.to(data.roomId).emit('RECEIVER_TOTAL_SUPPLY', data);
    }
  }

  @SubscribeMessage('JOIN_ROOM')
  listenJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: any) {
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
    this.server.sockets.to(data.roomId).emit('RECEIVER_LEAVE_ROOM', data);
    client.leave(data.roomId);
  }
}
