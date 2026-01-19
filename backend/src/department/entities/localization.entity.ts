import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Localization {
  @Field()
  name: string;

  @Field()
  description: string;
}
