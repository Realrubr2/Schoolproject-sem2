import { departmentInterface } from "../Interfaces/department";

export class Department implements departmentInterface {
	private department: string;

	constructor(department: string) {
		this.department = department;
	}

	getDepartment(): string {
		return this.department;
	}
}
