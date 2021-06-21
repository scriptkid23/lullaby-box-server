import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { jwtConstants } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async register(createUser: CreateUserDto): Promise<any> {
    const newUser = new this.userModel(createUser);
    return newUser.save();
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: username });

    if (user && user.password === pass) {
      return user;
    }
    return null;
  }
  async login(user: LoginUserDto) {
    const currentUser = await this.validateUser(user.username, user.password);
    if (currentUser) {
      const date = new Date();
      const payload: JwtPayload = {
        iat: date.getTime(),
        sub: currentUser._id,
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
