import * as argon2 from "argon2";
import { Password } from "../../Model/MysqlModels/password";

/**
 * @author Dannique Klaver
 *
 * @class LoginService
 * @description This class provides methods to interact with the login data.
 * @methods validateLogin() validates the user's login credentials.
 * @methods verifyPassword() verifies the user's password.
 * @methods createSession() creates a session for the user.
 */
export class PasswordValidationService {
	/**
	 * @author Dannique Klaver
	 * @description This method validates the length of the user's password.
	 * @param {string} password - The user's provided password.
	 * @param {express.Response} res - the status code and error message to send to the client.
	 */
	validatePasswordLength(password: string, res: any) {
		// check if password is empty, if so, return an error.
		if (!password) {
			throw new Error("Password field must not be empty");
		}

		// check if password is shorter than 8 characters, if so, return an error.
		if (password.length < 8) {
			throw new Error("Password must be at least 8 characters long");
		}
		// if password is longer than 8 characters and not empty, return true.
	}

	/**
	 * @author Dannique Klaver
	 * @description This method validates the user's password by comparing it to the hashed password in the database and checking the expiry date.
	 *
	 * @param {Array} passwordDataArray - An array of password data objects.
	 * @param {string} password - The user's password.
	 * @returns {Promise<Password>} - A promise that resolves with the password data object that matches the hashed password.
	 * @throws {Error} - An error indicating that the password is incorrect or expired.
	 *
	 */
	async validatePasswordData(
		passwordDataArray: Password[],
		password: string
	): Promise<Password> {
		// get the current date.
		const currentDate = new Date();
		let passwordData: Password;

		// iterate over the passwordDataArray.
		for (let i = 0; i < passwordDataArray.length; i++) {
			passwordData = passwordDataArray[i];
			const expiryDate = new Date(passwordData.getExpiryDate());
			const isPasswordMatch = await this.verifyPassword(
				passwordData.getHashedPassword(),
				password
			);

			// if the password matches and is not expired, return the password data.
			if (isPasswordMatch && expiryDate > currentDate) {
				return passwordData;
			}

			// if the password matches and is expired, throw an error.
			if (isPasswordMatch && expiryDate <= currentDate) {
				throw new Error(
					"Password is expired, please reset your password or use a new password"
				);
			}
		}

		// if no matching password data object is found, throw an error.
		throw new Error("Incorrect password, please try again");
	}

	/**
	 * @author Dannique Klaver
	 * @description This method verifies the user's password.
	 *
	 * @param {string} hashedPassword - The user's hashed password.
	 * @param {string} password - The user's password.
	 * @returns {Promise<boolean>;} - A promise that resolves with a boolean indicating whether the password is correct.
	 *
	 */
	async verifyPassword(
		hashedPassword: string,
		password: string
	): Promise<boolean> {
		return argon2.verify(hashedPassword, password);
	}
}
