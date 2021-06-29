import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EffectScreen,
  EffectScreenDocument,
} from 'src/schemas/effect-screen.schema';
import { AddEffectScreenDto } from './dto/add-effect-screen.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(EffectScreen.name)
    private effectScreenModel: Model<EffectScreenDocument>,
  ) {}
  async getAllEffectScreen(): Promise<any> {
    return this.effectScreenModel.find();
  }
  async addEffectScreen(effect: AddEffectScreenDto): Promise<any> {
    const newEffect = new this.effectScreenModel(effect);
    return newEffect.save();
  }
}
