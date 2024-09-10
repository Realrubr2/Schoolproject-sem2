import { user } from "../../Model/Interfaces/user";

export class User implements user {
	email: string;
	department: string;
	role: string;

	constructor(email: string, department: string, role: string) {
		this.email = email;
		this.department = department;
		this.role = role;
	}
}
