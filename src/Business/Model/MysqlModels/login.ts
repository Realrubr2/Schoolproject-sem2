import { login } from "../Interfaces/login";
export class LoginData implements login {
	private email: string;
	private password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}

	getEmail() {
		return this.email;
	}

	getPassword() {
		return this.password;
	}
}
