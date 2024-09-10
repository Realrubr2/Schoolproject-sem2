/**
 * data for signup, as received from the signUp request sent from the frontend of the application
 * @param email - the email input of the user
 * @param department - the department input of the user
 * @param password - the password input of the user
 *  @param passwordRepeat - the repeated password input of the user
 * @returns signUpData
 *
 * @author Britt Rood
 */
export class signUpData implements signUpData {
	private email: string;
	private department: string;
	private password: string;
	private passwordRepeat: string;

	constructor(
		email: string,
		department: string,
		password: string,
		passwordRepeat: string
	) {
		this.email = email;
		this.department = department;
		this.password = password;
		this.passwordRepeat = passwordRepeat;
	}

	getEmail() {
		return this.email;
	}

	getDepartment() {
		return this.department;
	}

	getPassword() {
		return this.password;
	}

	getPasswordRepeat() {
		return this.passwordRepeat;
	}
}
