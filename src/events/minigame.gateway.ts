import { Inject, Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { MinigameService } from 'src/minigame/minigame.service';
import { LeaveRoomDto } from 'src/room/dto/leave-room.dto';


@WebSocketGateway()
export class MiniGameGateway {
  @WebSocketServer()
  server: Server;
  constructor(private miniGameService: MinigameService) {}
  private logger: Logger = new Logger(MiniGameGateway.name);

  @SubscribeMessage('PING_PONG')
  async pingPong(@MessageBody() data: any) {
    this.logger.log(data);
  }

  @SubscribeMessage('SEND_OPEN_CELL')
  async listenMessages(@MessageBody() data: any) {
    let response = await this.miniGameService.openCell(data);
    if (response) {
      this.server.sockets.emit('RECEIVER_OPEN_CELL', response.openCell);
      this.server.sockets.emit('RECEIVER_HISTORY', response.history);
    }
  }
  @SubscribeMessage('SEND_TOTAL_SUPPLY')
  async listenIsTyping(@MessageBody() data: any) {
    let response = await this.miniGameService.updateTotalSupply(data);
    if (response) {
      this.server.sockets.emit('RECEIVER_TOTAL_SUPPLY', response);
    }
  }
}
