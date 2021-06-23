import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AudioDocument = Audio & Document;

@Schema()
export class Audio {
  @Prop({ indexes: true, required: true })
  name: string;
  @Prop({ required: true })
  artist: string;
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  image: string;
}

export const AudioSchema = SchemaFactory.createForClass(Audio);
