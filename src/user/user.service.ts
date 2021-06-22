import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findOne(email: string): Promise<UserDto | undefined | any> {
    const user = await this.userModel.findOne({ email: email });
    console.log(user);
    return new UserDto({
      _id: user._id,
      username: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
