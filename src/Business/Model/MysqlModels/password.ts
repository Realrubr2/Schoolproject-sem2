import { password } from "../Interfaces/password";

export class Password implements password {
	private registerDate: Date;
	private email: string;
	private hashedPassword: string;
	private expiryDate: Date;

	constructor(
		registerDate: Date,
		email: string,
		hashedPassword: string,
		expiryDate: Date
	) {
		this.registerDate = registerDate;
		this.email = email;
		this.hashedPassword = hashedPassword;
		this.expiryDate = expiryDate;
	}
	getRegisterDate(): Date {
		return this.registerDate;
	}
	getEmail(): string {
		return this.email;
	}
	getHashedPassword(): string {
		return this.hashedPassword;
	}
	getExpiryDate(): Date {
		return this.expiryDate;
	}
}
