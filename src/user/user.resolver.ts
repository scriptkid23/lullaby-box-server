import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Public } from 'src/decorate/public.decorate';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver()
@Public()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => String)
  async sayHello() {
    return 'Welcome!';
  }

  @Query(() => UserDto)
  async user(@Args('email') email: string): Promise<any> {
    return this.userService.findOne(email);
  }
}
