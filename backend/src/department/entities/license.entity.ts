import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DrivingLicense {
  @Field()
  hasLicense: string;

  @Field()
  type: string;

  @Field()
  expiryDate: string;
}
