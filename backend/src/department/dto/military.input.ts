import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MilitaryStatusInput {
  @Field({ nullable: true })
  requireTravelPermit?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  document?: string;
}
