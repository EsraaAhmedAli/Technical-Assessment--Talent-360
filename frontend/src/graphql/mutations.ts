import { gql } from '@apollo/client';

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
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
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
    deleteEmployee(departmentId: $departmentId, employeeId: $employeeId) {
      success
      message
    }
  }
`;
