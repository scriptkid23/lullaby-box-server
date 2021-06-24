import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/schemas/room.schema';
import { AddMessageDto } from './dto/add-message.dto';
import { CreateRoomDto } from './dto/add-room.dto';
import { AddTrackDto } from './dto/add-track.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';

@Injectable()
export class RoomService {
  constructor(
    // @InjectModel(Audio.name) private audioModel: Model<AudioDocument>
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {}

  async createRoom(room: CreateRoomDto): Promise<any> {
    const newRoom = new this.roomModel();
    newRoom.roomId = room.roomId;
    newRoom.name = room.name;
    newRoom.participants.push(room.participant);
    return newRoom.save();
  }
  async leaveRoom(leave: LeaveRoomDto): Promise<any> {
    return await this.roomModel.findOneAndUpdate(
      { roomId: leave.roomId },
      {
        $pull: {
          participants: { userId: leave.useId },
        },
      },
      { new: true, useFindAndModify: false },
    );
  }
  //   joinRoom
  async joinRoom(participant: JoinRoomDto): Promise<any> {
    return await this.roomModel.findOneAndUpdate(
      { roomId: participant.roomId },
      {
        $push: {
          participants: participant.participant,
        },
      },
      { new: true, useFindAndModify: false },
    );
  }
  async addtrack(track: AddTrackDto): Promise<any> {
    return await this.roomModel.findOneAndUpdate(
      { roomId: track.roomId },
      {
        $push: {
          tracks: track.track,
        },
      },
      { new: true, useFindAndModify: false },
    );
  }
  async addMessage(message: AddMessageDto): Promise<any> {
    return await this.roomModel.findOneAndUpdate(
      { roomId: message.roomId },
      {
        $push: {
          messages: message.message,
        },
      },
      { new: true, useFindAndModify: false },
    );
  }

  // add message
}
