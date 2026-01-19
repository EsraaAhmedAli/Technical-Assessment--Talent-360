import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Localization } from './localization.entity';
import { ParentDepartment } from './parent-department.entity';
import { Employee } from './employee.entity';
import { BasicInformation } from './basic-info.entity';
import { ContactInformation } from './contact-info.entity';
import { EmergencyContacts } from './emergency.entity';
import { AddressDetails } from './address.entity';
import { DrivingLicense } from './license.entity';
import { MilitaryStatus } from './military.entity';
import { BankInformation } from './bank.entity';

@ObjectType()
export class Department {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Localization)
  localization: Localization;

  @Field()
  code: number;

  @Field()
  manager: string;

  @Field()
  location: string;

  @Field()
  employeesNumber: number;

  @Field()
  status: boolean;

  @Field(() => ParentDepartment, { nullable: true })
  parentDepartment: ParentDepartment | null;

  @Field()
  createdAt: string;

  @Field(() => [Employee])
  employees: Employee[];

  @Field(() => BasicInformation)
  basicInformation: BasicInformation;

  @Field(() => ContactInformation)
  contactInformation: ContactInformation;

  @Field(() => EmergencyContacts)
  emergencyContacts: EmergencyContacts;

  @Field(() => AddressDetails)
  addressDetails: AddressDetails;

  @Field(() => DrivingLicense)
  drivingLicense: DrivingLicense;

  @Field(() => MilitaryStatus)
  militaryStatus: MilitaryStatus;

  @Field(() => BankInformation)
  bankInformation: BankInformation;
}
