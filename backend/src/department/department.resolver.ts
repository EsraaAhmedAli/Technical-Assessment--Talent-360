import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { DeleteEmployeeResponse } from './dto/delete-employee.response';
import { Employee } from './entities/employee.entity';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Query(() => Department, { name: 'department' })
  getDepartment(@Args('id', { type: () => ID }) id: string) {
    return this.departmentService.getDepartment(id);
  }

  @Query(() => [Employee], { name: 'employees' })
  getEmployees(@Args('departmentId', { type: () => ID }) departmentId: string) {
    return this.departmentService.getEmployees(departmentId);
  }

  @Mutation(() => Department)
  updateDepartment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateDepartmentInput,
  ) {
    return this.departmentService.updateDepartment(id, input);
  }

  @Mutation(() => DeleteEmployeeResponse)
  deleteEmployee(
    @Args('departmentId', { type: () => ID }) departmentId: string,
    @Args('employeeId', { type: () => ID }) employeeId: string,
  ) {
    return this.departmentService.deleteEmployee(departmentId, employeeId);
  }
}
