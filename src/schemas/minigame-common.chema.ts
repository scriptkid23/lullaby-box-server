import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { wasOpen } from './default';

export type MiniGameCommonDocument = MiniGameCommon & Document;

@Schema()
export class MiniGameCommon {
  @Prop({ default: '0' })
  total_supply: string;
  @Prop({ default: wasOpen })
  was_open: number[];
}

export const MiniGameCommonSchema =
  SchemaFactory.createForClass(MiniGameCommon);
