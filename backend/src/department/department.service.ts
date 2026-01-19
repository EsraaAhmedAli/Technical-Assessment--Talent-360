import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DepartmentService {
  private department: any;

  constructor() {
    this.loadDepartmentData();
  }

  private loadDepartmentData() {
    try {
      // Use absolute path to ensure the file is found
      const filePath = path.join(process.cwd(), 'src', 'data', 'department.json');
      const rawData = fs.readFileSync(filePath, 'utf8');
      const departmentData = JSON.parse(rawData);
      
      // Initialize the department from JSON data
      this.department = { ...departmentData.department };
      console.log('Department data loaded successfully:', this.department.name);
    } catch (error) {
      console.error('Error loading department data from JSON:', error.message);
      console.error('File path attempted:', path.join(process.cwd(), 'src', 'data', 'department.json'));
      
      // Fallback: create default department data
      this.department = {
        code: 11557,
        name: 'Finance Department',
        description: 'description',
        localization: {
          name: 'الحسابات',
          description: 'وصف'
        },
        manager: 'john smith',
        location: 'HQ, london office',
        employeesNumber: 10,
        status: true,
        parentDepartment: null,
        createdAt: '2019-01-01T12:30:00.000Z',
        employees: [
          {
            id: 11557,
            name: 'M. ElGandour',
            role: 'Manager',
            contact: '+201712345678'
          },
          {
            id: 11555,
            name: 'K. AbdElkader',
            role: 'CTO',
            contact: '01712345678'
          },
          {
            id: 12365,
            name: 'F. Rezk',
            role: 'CEO',
            contact: '01712345678'
          }
        ]
      };
    }
  }

  getDepartment(id: string) {
    // For this task, we'll use a static ID or return the department
    // In a real app, you'd filter by ID
    if (id === '11557' || id === this.department.code.toString()) {
      return {
        ...this.department,
        id: this.department.code.toString(),
      };
    }
    return null;
  }

  updateDepartment(id: string, input: any) {
    if (id === '11557' || id === this.department.code.toString()) {
      // Update the department with new data
      const merged = {
        basicInformation: {
          ...this.department.basicInformation,
          ...(input.basicInformation || {}),
        },
        contactInformation: {
          ...this.department.contactInformation,
          ...(input.contactInformation || {}),
        },
        emergencyContacts: {
          ...this.department.emergencyContacts,
          ...(input.emergencyContacts || {}),
        },
        addressDetails: {
          ...this.department.addressDetails,
          ...(input.addressDetails || {}),
        },
        drivingLicense: {
          ...this.department.drivingLicense,
          ...(input.drivingLicense || {}),
        },
        militaryStatus: {
          ...this.department.militaryStatus,
          ...(input.militaryStatus || {}),
        },
        bankInformation: {
          ...this.department.bankInformation,
          ...(input.bankInformation || {}),
        },
      };
      this.department = {
        ...this.department,
        ...input,
        ...merged,
        code: this.department.code, // Preserve code
        createdAt: this.department.createdAt, // Preserve createdAt
        employees: this.department.employees, // Preserve employees unless explicitly changed
        employeesNumber: input.employees
          ? input.employees.length
          : this.department.employees.length,
      };
      return {
        ...this.department,
        id: this.department.code.toString(),
      };
    }
    return null;
  }

  deleteEmployee(departmentId: string, employeeId: string) {
    if (departmentId === '11557' || departmentId === this.department.code.toString()) {
      const employeeIndex = this.department.employees.findIndex(
        (emp) => emp.id.toString() === employeeId.toString(),
      );
      if (employeeIndex !== -1) {
        this.department.employees.splice(employeeIndex, 1);
        this.department.employeesNumber = this.department.employees.length;
        return { success: true };
      }
      return { success: false, message: 'Employee not found' };
    }
    return { success: false, message: 'Department not found' };
  }

  getEmployees(departmentId: string) {
    if (departmentId === '11557' || departmentId === this.department.code.toString()) {
      return this.department.employees || [];
    }
    return [];
  }
}