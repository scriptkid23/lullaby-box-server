import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
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
      const payload = {
        username: currentUser.username,
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
