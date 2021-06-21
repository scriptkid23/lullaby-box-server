import { Get, UseGuards, Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('user')
export class UserController {
  @ApiBearerAuth()
  @Get()
  findAll(): string {
    return 'Find all';
  }
}
