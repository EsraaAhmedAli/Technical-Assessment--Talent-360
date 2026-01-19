import { gql } from '@apollo/client';

export const GET_DEPARTMENT = gql`
  query GetDepartment($id: ID!) {
    department(id: $id) {
      id
      name
      description
      localization {
        name
        description
      }
      code
      manager
      location
      employeesNumber
      status
      parentDepartment {
        id
        name
      }
      createdAt
      basicInformation {
        nationalIdNumber
        nationalIdExpiry
        title
        firstName
        fatherName
        grandFatherName
        familyName
        firstNameAr
        fatherNameAr
        grandFatherNameAr
        familyNameAr
        dateOfBirth
        gender
        nationality
        additionalNationality
        passportNo
        passportIssueDate
        passportExpiryDate
        maritalStatus
        dependencies
      }
      contactInformation {
        personalEmail
        mobile
      }
      emergencyContacts {
        contactName
        relation
        phone
      }
      addressDetails {
        country
        city
        postalCode
        building
        street
        floorNo
        apartment
      }
      drivingLicense {
        hasLicense
        type
        expiryDate
      }
      militaryStatus {
        requireTravelPermit
        status
        document
      }
      bankInformation {
        bankName
        iban
      }
      employees {
        id
        name
        role
        contact
      }
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query GetEmployees($departmentId: ID!) {
    employees(departmentId: $departmentId) {
      id
      name
      role
      contact
    }
  }
`;
