import { signUpCrudInterface } from "../../../Data/interface/signUpCrudInterface";

export class SignUpEmailValidationService {
	public constructor(private signUpCrudInterface: signUpCrudInterface) {}
	/**
	 * @author Dannique Klaver
	 * @description This method validates the email of the user.
	 *
	 * @param {Array} passwordDataArray - An array of password data objects.
	 * @param {string} email - The email to validate.
	 * @param {express.Response} res - the status code and error message to send to the client.
	 */
	validateEmail(email: string, res: any) {
		// check if email is empty, if so, return an error.
		if (!email) {
			throw new Error("Email field must not be empty");
		}

		// check if email is using valid email format
		/**
		 * regex explanation:
		 * ^ asserts position at start of a line
		 * [^\s@]+ matches any character that is not a whitespace character or @, one or more times
		 * @ matches the character @ literally
		 * [^\s@]+ matches any character that is not a whitespace character or @, one or more times
		 * \. matches the character . literally
		 * [^\s@]+ matches any character that is not a whitespace character or @, one or more times
		 * $ asserts position at the end of a line
		 */
		let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			throw new Error("Invalid email format");
		}

		// check if email ends with "@jordit.com"
		if (!email.endsWith("@jordit.com")) {
			throw new Error(
				"Incorrect email, please use an email ending in '@jordit.com'."
			);
		}
		// if passwordDataArray is not null or empty and email ends with "@jordit.com", return true.
	}

	/**
	 * Checks if the provided email already exists in the database.
	 * @param email - The email to check.
	 * @returns A Promise that resolves to a boolean indicating if the email exists.
	 * @returns boolean, does the email exist or not
	 * @throws An error if the email already exists.
	 *
	 * @author Britt Rood
	 */
	async checkIfEmailExists(email: string): Promise<boolean> {
		const userExists = await this.signUpCrudInterface.checkIfUserExists(email);
		if (userExists) {
			throw new Error("User already exists");
		}
		return userExists;
	}
}
