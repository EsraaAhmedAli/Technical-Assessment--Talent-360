import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DrivingLicenseInput {
  @Field({ nullable: true })
  hasLicense?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  expiryDate?: string;
}
