import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/decorate/public.decorate';
import { AddMessageDto } from './dto/add-message.dto';
import { CreateRoomDto } from './dto/add-room.dto';
import { AddTrackDto } from './dto/add-track.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';
import { RoomService } from './room.service';

@Public()
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get(':id')
  async findRoom(@Param('id') id: string): Promise<any> {
    return this.roomService.getRoom(id);
  }
  @Post('/create')
  async createRoom(@Body() room: CreateRoomDto): Promise<any> {
    return this.roomService.createRoom(room);
  }
  @Post('/add/track')
  async addTrack(@Body() track: AddTrackDto): Promise<any> {
    return this.roomService.addtrack(track);
  }
  @Post('/add/message')
  async addMessage(@Body() message: AddMessageDto): Promise<any> {
    return this.roomService.addMessage(message);
  }
  @Post('/join')
  async JoinRoom(@Body() room: JoinRoomDto): Promise<any> {
    return this.roomService.joinRoom(room);
  }
  @Post('/leave')
  async leaveRoom(@Body() leave: LeaveRoomDto): Promise<any> {
    return this.roomService.leaveRoom(leave);
  }
}
