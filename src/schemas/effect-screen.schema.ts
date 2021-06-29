import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EffectScreenDocument = EffectScreen & Document;

@Schema()
export class EffectScreen {
  @Prop({ indexes: true, required: true })
  keywork: string;
  @Prop({ required: true })
  url: string;
}

export const EffectScreenSchema = SchemaFactory.createForClass(EffectScreen);
