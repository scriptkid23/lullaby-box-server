import { Get, UseGuards, Controller, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddEffectScreenDto } from './dto/add-effect-screen.dto';
import { UserService } from './user.service';
import { Public } from '../decorate/public.decorate';
@Public()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/get/effect-screen')
  async getAllEffectScreen(): Promise<any> {
    return this.userService.getAllEffectScreen();
  }
  @Post('/add/effect-screen')
  async addEffectScreen(@Body() effect: AddEffectScreenDto): Promise<any> {
    return this.userService.addEffectScreen(effect);
  }
}
