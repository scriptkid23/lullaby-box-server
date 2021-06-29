import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes, Types } from 'mongoose';

type LastMessage = {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  message: string;
  seenby: any;
};
export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ indexes: true, required: true })
  roomId: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  participants: {
    userId: string;
    name: string;
    avatar: string;
  }[];
  @Prop({ default: [] })
  messages: {
    id: string;
    userId: string;
    name: string;
    avatar: string;
    message: string;
  }[];
  @Prop({ default: [] })
  tracks: {
    name: string;
    artist: string;
    url: string;
    image: string;
  }[];
  @Prop()
  icon: string;
  @Prop({
    type: Object,
    default: {
      id: '',
      userId: '',
      name: '',
      avatar: '',
      message: '',
      seenby: [],
    },
  })
  lastMessage: LastMessage;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
