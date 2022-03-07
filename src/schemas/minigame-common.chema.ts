import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { wasOpen } from './default';

export type MiniGameCommonDocument = MiniGameCommon & Document;

@Schema()
export class MiniGameCommon {
  @Prop({ required: true, unique: true})
  event_id: string;
  @Prop()
  total_supply: string;
  @Prop()
  was_open: number[];
}

export const MiniGameCommonSchema =
  SchemaFactory.createForClass(MiniGameCommon);
