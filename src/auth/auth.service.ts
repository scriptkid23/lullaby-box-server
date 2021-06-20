import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { jwtConstants } from './constants';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: LoginUserDto) {
    const currentUser = await this.validateUser(user.username, user.password);
    if (currentUser) {
      const date = new Date();
      const payload: JwtPayload = {
        iat: date.getTime(),
        sub: currentUser.userId,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException(
        'Username or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
