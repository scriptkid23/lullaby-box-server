import { Module } from '@nestjs/common';
import { MinigameService } from './minigame.service';
import { MinigameController } from './minigame.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MiniGameCommon, MiniGameCommonSchema } from 'src/schemas/minigame-common.chema';
import { MiniGameHistory, MiniGameHistorySchema } from 'src/schemas/minigame-history.schema';
import { RoomService } from 'src/room/room.service';

@Module({
  providers: [MinigameService],
  controllers: [MinigameController],
  exports: [MinigameService],
  imports: [
    MongooseModule.forFeature([
      { name: MiniGameCommon.name, schema: MiniGameCommonSchema },
      { name: MiniGameHistory.name, schema: MiniGameHistorySchema },
    ]),
  ],
})
export class MinigameModule {}
