import { MiniGameCommonSchema } from './../schemas/minigame-common.chema';
import { Module } from '@nestjs/common';
import { MinigameService } from './minigame.service';
import { MinigameController } from './minigame.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MiniGameCommon } from 'src/schemas/minigame-common.chema';
import { MiniGameHistory, MiniGameHistorySchema } from 'src/schemas/minigame-history.schema';

@Module({
  providers: [MinigameService],
  controllers: [MinigameController],
  imports: [
    MongooseModule.forFeature([
      { name: MiniGameCommon.name, schema: MiniGameCommonSchema },
      { name: MiniGameHistory.name, schema: MiniGameHistorySchema },
    ]),
  ],
})
export class MinigameModule {}
