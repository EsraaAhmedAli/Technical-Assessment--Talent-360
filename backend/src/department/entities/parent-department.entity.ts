import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ParentDepartment {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
