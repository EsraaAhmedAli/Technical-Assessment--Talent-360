import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BankInformation {
  @Field()
  bankName: string;

  @Field()
  iban: string;
}
