import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ContactInformation {
  @Field()
  personalEmail: string;

  @Field()
  mobile: string;
}
