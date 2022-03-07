import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { wasOpen } from './default';

export type MiniGameHistoryDocument = MiniGameHistory & Document;

@Schema()
export class MiniGameHistory {
  @Prop({required: true})
  address: string;
  @Prop({ required: true})
  message: string;
}

export const MiniGameHistorySchema =
  SchemaFactory.createForClass(MiniGameHistory);
