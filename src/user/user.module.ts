import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EffectScreen,
  EffectScreenSchema,
} from 'src/schemas/effect-screen.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    MongooseModule.forFeature([
      { name: EffectScreen.name, schema: EffectScreenSchema },
    ]),
  ],
})
export class UserModule {}
