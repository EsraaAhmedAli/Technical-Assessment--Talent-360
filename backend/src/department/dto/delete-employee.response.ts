import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteEmployeeResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
