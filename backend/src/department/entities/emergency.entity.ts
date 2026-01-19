import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class EmergencyContacts {
  @Field()
  contactName: string;

  @Field()
  relation: string;

  @Field()
  phone: string;
}
