import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AddressDetails {
  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  postalCode: string;

  @Field()
  building: string;

  @Field()
  street: string;

  @Field()
  floorNo: string;

  @Field()
  apartment: string;
}
