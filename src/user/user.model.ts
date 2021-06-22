import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
