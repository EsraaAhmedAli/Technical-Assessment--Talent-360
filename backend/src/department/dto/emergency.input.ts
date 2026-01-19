import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EmergencyContactsInput {
  @Field({ nullable: true })
  contactName?: string;

  @Field({ nullable: true })
  relation?: string;

  @Field({ nullable: true })
  phone?: string;
}
