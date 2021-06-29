import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/schemas/room.schema';
import { AddMessageDto } from './dto/add-message.dto';
import { CreateRoomDto } from './dto/add-room.dto';
import { AddSeenDto } from './dto/add-seen.dto';
import { AddTrackDto } from './dto/add-track.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';

@Injectable()
export class RoomService {
  constructor(
    // @InjectModel(Audio.name) private audioModel: Model<AudioDocument>
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {}
  async checkRoomExist(room: string): Promise<any> {
    return await this.roomModel.exists({
      roomId: room,
    });
  }
  async getRoom(room: string): Promise<any> {
    return await this.roomModel.findOne({ roomId: room });
  }
  async createRoom(room: CreateRoomDto): Promise<any> {
    const newRoom = new this.roomModel(room);

    return newRoom.save();
  }
  async leaveRoom(leave: LeaveRoomDto): Promise<any> {
    return await this.roomModel.findOneAndUpdate(
      { roomId: leave.roomId },
      {
        $pull: {
          participants: { userId: leave.userId },
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
    const doc = await this.roomModel.findOneAndUpdate(
      { roomId: message.roomId },
      {
        $push: {
          messages: message.message,
        },
      },
      { new: true, useFindAndModify: false },
    );
    doc.lastMessage = {
      ...message.message,
      seenby: [],
    };
    return await doc.save();
  }
  async addSeen(message: AddSeenDto): Promise<any> {
    const doc = await this.roomModel.findOne({ roomId: message.roomId });
    if (doc.lastMessage.message.length > 0) {
      if (doc.lastMessage.userId !== message.participant.userId) {
        const index = doc.lastMessage.seenby.findIndex((value) => {
          return value.userId === message.participant.userId;
        });

        if (index === -1) {
          doc.lastMessage.seenby.push(message.participant);
        }
      }
      doc.markModified('lastMessage');
      return await doc.save();
    }
    return doc;
  }
}
