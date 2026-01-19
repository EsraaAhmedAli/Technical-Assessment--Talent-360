import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LocalizationInput {
  @Field()
  name: string;

  @Field()
  description: string;
}
