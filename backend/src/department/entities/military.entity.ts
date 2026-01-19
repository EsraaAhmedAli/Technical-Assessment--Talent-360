import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MilitaryStatus {
  @Field()
  requireTravelPermit: string;

  @Field()
  status: string;

  @Field()
  document: string;
}
