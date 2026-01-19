import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ContactInformationInput {
  @Field({ nullable: true })
  personalEmail?: string;

  @Field({ nullable: true })
  mobile?: string;
}
