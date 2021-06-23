import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AudioDocument = Audio & Document;

@Schema()
export class Audio {
  @Prop({ required: true })
  name: string;
  @Prop({ indexes: true, required: true })
  artist: string;
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  image: string;
}

export const AudioSchema = SchemaFactory.createForClass(Audio);
