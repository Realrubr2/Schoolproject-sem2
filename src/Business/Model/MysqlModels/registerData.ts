/**
 * class for all the information that is used within the registration process.
 * @param email - the email of the user
 * @param department - the department of the user
 * @param role - the role of the user
 * @param registerDate - the date of registration
 * @param hashedPassword - the hashed password of the user
 * @param expiryDate - the date of expiry
 * @returns registerData
 *
 * @author Britt Rood
 */
import { register } from "../Interfaces/registerData";
export class RegisterData implements register {
	private email: string;
	private department: string;
	private role: string;
	private registerDate: Date;
	private hashedPassword: string;
	private expiryDate: Date;

	constructor(
		email: string,
		department: string,
		role: string,
		registerDate: Date,
		hashedPassword: string,
		expiryDate: Date
	) {
		this.email = email;
		this.department = department;
		this.role = role;
		this.registerDate = registerDate;
		this.hashedPassword = hashedPassword;
		this.expiryDate = expiryDate;
	}

	getEmail() {
		return this.email;
	}

	getDepartment() {
		return this.department;
	}

	getRole() {
		return this.role;
	}

	getRegisterDate() {
		return this.registerDate;
	}

	getHashedPassword() {
		return this.hashedPassword;
	}

	getExpiryDate() {
		return this.expiryDate;
	}
}
