import { InputType, Field } from '@nestjs/graphql';
import { LocalizationInput } from './localization.input';
import { BasicInformationInput } from './basic-info.input';
import { ContactInformationInput } from './contact-info.input';
import { EmergencyContactsInput } from './emergency.input';
import { AddressDetailsInput } from './address.input';
import { DrivingLicenseInput } from './license.input';
import { MilitaryStatusInput } from './military.input';
import { BankInformationInput } from './bank.input';

@InputType()
export class UpdateDepartmentInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => LocalizationInput, { nullable: true })
  localization?: LocalizationInput;

  @Field({ nullable: true })
  manager?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  status?: boolean;

  @Field(() => BasicInformationInput, { nullable: true })
  basicInformation?: BasicInformationInput;

  @Field(() => ContactInformationInput, { nullable: true })
  contactInformation?: ContactInformationInput;

  @Field(() => EmergencyContactsInput, { nullable: true })
  emergencyContacts?: EmergencyContactsInput;

  @Field(() => AddressDetailsInput, { nullable: true })
  addressDetails?: AddressDetailsInput;

  @Field(() => DrivingLicenseInput, { nullable: true })
  drivingLicense?: DrivingLicenseInput;

  @Field(() => MilitaryStatusInput, { nullable: true })
  militaryStatus?: MilitaryStatusInput;

  @Field(() => BankInformationInput, { nullable: true })
  bankInformation?: BankInformationInput;
}
