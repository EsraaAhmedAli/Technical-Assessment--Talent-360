import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BasicInformation {
  @Field()
  nationalIdNumber: string;

  @Field()
  nationalIdExpiry: string;

  @Field()
  title: string;

  @Field()
  firstName: string;

  @Field()
  fatherName: string;

  @Field()
  grandFatherName: string;

  @Field()
  familyName: string;

  @Field()
  firstNameAr: string;

  @Field()
  fatherNameAr: string;

  @Field()
  grandFatherNameAr: string;

  @Field()
  familyNameAr: string;

  @Field()
  dateOfBirth: string;

  @Field()
  gender: string;

  @Field()
  nationality: string;

  @Field()
  additionalNationality: string;

  @Field()
  passportNo: string;

  @Field()
  passportIssueDate: string;

  @Field()
  passportExpiryDate: string;

  @Field()
  maritalStatus: string;

  @Field()
  dependencies: string;
}
