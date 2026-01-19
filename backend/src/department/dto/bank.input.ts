import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BankInformationInput {
  @Field({ nullable: true })
  bankName?: string;

  @Field({ nullable: true })
  iban?: string;
}
