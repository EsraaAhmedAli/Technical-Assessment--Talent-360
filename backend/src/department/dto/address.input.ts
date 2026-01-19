import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddressDetailsInput {
  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  postalCode?: string;

  @Field({ nullable: true })
  building?: string;

  @Field({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  floorNo?: string;

  @Field({ nullable: true })
  apartment?: string;
}
