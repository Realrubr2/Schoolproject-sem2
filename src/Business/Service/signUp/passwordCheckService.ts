import argon2 from "argon2";

/**
 * Service for checking passwords and hashing them using Argon2.
 *
 * Code in this file checks the password validity,
 * hashes the password using Argon2,
 * sets the register date to the current date,
 * and sets the expiry date for the password a year from the current date.
 *
 * @class PasswordCheckService
 * @author Britt Rood
 */

export class PasswordCheckService {
	/**
	 * Checks if the provided passwords are the same and if the password is valid.
	 * @param password - The password to check.
	 * @param passwordRepeat - The repeated password to check against.
	 * @returns A Promise that resolves to a boolean indicating if the passwords are the same and if the password is valid.
	 */
	public checkPassword(
		password: string,
		passwordRepeat: string
	): Promise<boolean> {
		const arePasswordsSame = this.checkIfPasswordsAreTheSame(
			password,
			passwordRepeat
		);
		if (!arePasswordsSame) {
			return Promise.resolve(false);
		}
		return this.checkIfPasswordIsValid(password);
	}

	/**
	 * Checks if the provided passwords are the same.
	 * @param password - The password to check.
	 * @param passwordRepeat - The repeated password to check against.
	 * @returns A boolean indicating if the passwords are the same.
	 */
	private checkIfPasswordsAreTheSame(
		password: string,
		passwordRepeat: string
	): boolean {
		return password === passwordRepeat;
	}

	/**
	 * Checks if the provided password is valid.
	 * @param password - The password to check.
	 * @returns A Promise that resolves to a boolean indicating if the password is valid.
	 * @throws An error if the password is invalid.
	 * @returns boolean, is the password valid or not
	 *
	 * Password must have at least 8 characters
	 * Password must have at least one uppercase letter
	 * Password must have at least two numbers
	 */

	/**
	 * passwordRegex:
	 * ^: This asserts the start of a line. The password must start with the following conditions.
	 * (?=.*[A-Z]): This is a positive lookahead, which asserts that what immediately follows the current position in the string must be any character (.*) followed by an uppercase letter
	 * ([A-Z]). This checks that the password contains at least one uppercase letter.
	 * (?=.*[0-9].*[0-9]): This is another positive lookahead. It asserts that what immediately follows the current position in the string must be any character (.*) followed by a digit ([0-9]), followed by any character (.*), followed by another digit
	 * ([0-9]). This checks that the password contains at least two digits.
	 * .{8,}$: This asserts that what immediately follows the current position in the string must be any character (.), repeated at least 8 times ({8,}).
	 * The $ asserts the end of a line. This checks that the password is at least 8 characters long.
	 */
	private async checkIfPasswordIsValid(password: string): Promise<boolean> {
		const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
		if (!passwordRegex.test(password)) {
			throw new Error("Invalid password format");
		}
		if (password.length < 8) {
			throw new Error("Password must have at least 8 characters");
		}
		if (!/[A-Z]/.test(password)) {
			throw new Error("Password must have at least one uppercase letter");
		}
		if (!/[0-9].*[0-9]/.test(password)) {
			throw new Error("Password must have at least two numbers");
		}
		return true;
	}

	/**
	 * Hashes the provided password using Argon2.
	 * @param password - The password to hash.
	 * @returns A Promise that resolves to the hashed password.
	 * @returns string, the hashed password
	 */
	public async hashWithArgon(password: string): Promise<string> {
		return await argon2.hash(password);
	}
}
