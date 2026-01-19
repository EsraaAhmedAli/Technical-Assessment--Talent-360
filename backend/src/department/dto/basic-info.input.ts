import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BasicInformationInput {
  @Field({ nullable: true })
  nationalIdNumber?: string;

  @Field({ nullable: true })
  nationalIdExpiry?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  fatherName?: string;

  @Field({ nullable: true })
  grandFatherName?: string;

  @Field({ nullable: true })
  familyName?: string;

  @Field({ nullable: true })
  firstNameAr?: string;

  @Field({ nullable: true })
  fatherNameAr?: string;

  @Field({ nullable: true })
  grandFatherNameAr?: string;

  @Field({ nullable: true })
  familyNameAr?: string;

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  nationality?: string;

  @Field({ nullable: true })
  additionalNationality?: string;

  @Field({ nullable: true })
  passportNo?: string;

  @Field({ nullable: true })
  passportIssueDate?: string;

  @Field({ nullable: true })
  passportExpiryDate?: string;

  @Field({ nullable: true })
  maritalStatus?: string;

  @Field({ nullable: true })
  dependencies?: string;
}
