import { Args, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Query } from 'mongoose';
import { User } from './user.model';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UserResolver {

    @Query(returns => User)
    async user(@Args('email') email:string): Promise<User>{
        const user = await 
    }
}
