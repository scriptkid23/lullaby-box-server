import { Minesweeper__factory } from './contracts/factories/Minesweeper__factory';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { UpdateTotalSupplyDto } from './dto/update-total-supply.dto';
import {
  Injectable,
  HttpException,
  HttpStatus,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { wasOpen } from 'src/schemas/default';
import { ethers } from 'ethers';
import {
  MiniGameCommon,
  MiniGameCommonDocument,
} from 'src/schemas/minigame-common.chema';
import {
  MiniGameHistory,
  MiniGameHistoryDocument,
} from 'src/schemas/minigame-history.schema';
import { Minesweeper } from './contracts/Minesweeper';

const MINESWEEPER_CONTRACT = '0xF4b0c9349E7456C83fa0bC3B9d112a136246aD50';
const BSC_RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545';
@Injectable()
export class MinigameService implements OnModuleInit {
  contract: Minesweeper;
  constructor(
    // @InjectModel(Audio.name) private audioModel: Model<AudioDocument>
    @InjectModel(MiniGameCommon.name)
    private miniGameCommonModel: Model<MiniGameCommonDocument>,
    @InjectModel(MiniGameHistory.name)
    private miniGameHistoryModel: Model<MiniGameHistoryDocument>,
  ) {}
  onModuleInit() {
    const provider = new ethers.providers.JsonRpcProvider(BSC_RPC_URL);
    const _contract = Minesweeper__factory.connect(
      MINESWEEPER_CONTRACT,
      provider,
    );
    this.contract = _contract;
  }
  async getMiniGameCommon(eventId: string): Promise<any> {
    return await this.miniGameCommonModel.findOne({ event_id: eventId });
  }

  async getBalance(): Promise<any> {
    let balance = await this.contract.getBalance();
    return balance.toString();
  }
  async createEvent(eventId: string): Promise<any> {
    try {
      let miniGameInit = new this.miniGameCommonModel({
        event_id: eventId,
        total_supply: '0',
        was_open: wasOpen,
      });
      miniGameInit.save();
    } catch (error) {
      throw new HttpException('Dupplicate', HttpStatus.BAD_REQUEST);
    }
  }
  async getMiniGameHistory(): Promise<any> {
    return await this.miniGameHistoryModel.find().sort({createdAt: -1})
  }
  async openCell(input: any): Promise<any> {
    try {
      let _record = await this.miniGameCommonModel.findOne({
        event_id: input.eventId,
      });

      let key = ethers.BigNumber.from(input.event[0].args[1]).toNumber();
      let cell = ethers.BigNumber.from(input.event[0].args[2]).toNumber();
      let message = '';
      _record.was_open[key] = cell;
      if (input.cell !== 0 || input.cell !== 5) {
        let balance = await this.getBalance();
        _record.total_supply = balance;
      }
      await this.miniGameCommonModel.updateOne(
        { event_id: input.eventId },
        { $set: { was_open: _record.was_open } },
      );
      switch (cell) {
        case 0:
          message = 'You lose all turns.';
          this.updateMiniGameHistory({
            address: input.event[0].args[0],
            message: 'You lose all turns.',
          });
          break;
        case 5:
          message = 'You only lose 1 turn.';
          this.updateMiniGameHistory({
            address: input.event[0].args[0],
            message: 'You only lose 1 turn.',
          });
          break;
        default:
          message = `You have received ${cell}% of the total supply`;
          this.updateMiniGameHistory({
            address: input.event[0].args[0],
            message: `You have received ${cell}% of the total supply`,
          });
          break;
      }

      _record.save();
      return {
        openCell: _record,
        history: { address: input.event[0].args[0], message: message },
      };
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async updateTotalSupply(input: UpdateTotalSupplyDto): Promise<any> {
    try {
      let _record = await this.miniGameCommonModel.findOne({
        event_id: input.eventId,
      });
      let balance = await this.getBalance();
      _record.total_supply = balance;
      _record.save();
      return { balance: balance };
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async updateMiniGameHistory(input: UpdateHistoryDto): Promise<any> {
    try {
      let _record = new this.miniGameHistoryModel(input);
      _record.save();
    } catch (error) {
      throw new HttpException('Dupplicate', HttpStatus.BAD_REQUEST);
    }
  }
}
