import { signUpCrudInterface } from "../../../Data/interface/signUpCrudInterface";
import { PasswordCheckService } from "./passwordCheckService";
import { signUpDateService } from "./dateService";
import { signUpData } from "../../Model/MysqlModels/signUpData";
import { SignUpEmailValidationService } from "./signUpEmailService";
import { RegisterData } from "../../Model/MysqlModels/registerData";
import { Password } from "../../Model/MysqlModels/password";

/**
 * Represents a service for signing up users.
 * @author Britt Rood
 */
export class signUpService {
	/**
	 * Creates an instance of signUpService.
	 *
	 * @param crudInterface - The CRUD interface for interacting with the database.
	 * @param passwordCheckService - The service for checking password-related operations.
	 * @param signUpEmailValidationService - The service for checking email-related operations.
	 * @param signUpDateService - The service for handling date-related operations.
	 */
	constructor(
		private crudInterface: signUpCrudInterface,
		private passwordCheckService: PasswordCheckService,
		private signUpEmailValidationService: SignUpEmailValidationService,
		private signUpDateService: signUpDateService
	) {}

	/**
	 * checks all the data from the sign up form and creates a new user in the database.
	 *
	 * @param signUpData - The data to sign up with.
	 * @returns boolean - A promise that resolves to a boolean indicating if the sign up was successful.
	 */
	async handleSignUpService(signUpData: signUpData) {
		// check if user already exists
		await this.signUpEmailValidationService.checkIfEmailExists(
			signUpData.getEmail()
		);

		// check if department is not empty
		if (signUpData.getDepartment() === "") {
			throw new Error("Department is required");
		}

		// check if password input is valid
		const passwordValid = await this.passwordCheckService.checkPassword(
			signUpData.getPassword(),
			signUpData.getPasswordRepeat()
		);
		// hash password when valid
		if (passwordValid) {
			const hashedPassword = await this.passwordCheckService.hashWithArgon(
				signUpData.getPassword()
			);
			// role (user rights within application, standard set to 'gebruiker'), register date and expiry date
			const role = await this.createRole();
			const expiryDate = this.getExpiryDates();
			const registerDate = this.getRegisterDates();

			// Create registerData instance
			const registerDataInstance = new RegisterData(
				signUpData.getEmail(),
				signUpData.getDepartment(),
				role,
				registerDate,
				hashedPassword,
				expiryDate
			);

			// Create password instance
			const passwordInstance = new Password(
				registerDataInstance.getRegisterDate(),
				registerDataInstance.getEmail(),
				registerDataInstance.getHashedPassword(),
				registerDataInstance.getExpiryDate()
			);

			// Call createUser with registerData instance
			await this.createUser(registerDataInstance);
			await this.createPassword(passwordInstance);

			// return true if everything is successful
			return true;
		} else {
			throw new Error("Password is invalid");
		}
	}

	/**
	 * gets the created expiry date from within the dateService.
	 * @returns {Promise<string>} - A promise that resolves to the expiry date of the user.
	 */
	getExpiryDates() {
		return this.signUpDateService.createExpiryDate();
	}

	/**
	 * gets the created register date from within the dateService.
	 * @returns {Promise<string>} - A promise that resolves to the register date of the user.
	 */
	getRegisterDates() {
		return this.signUpDateService.createRegisterDate();
	}

	/**
	 * Creates a role for the user.
	 * @returns {Promise<string>} - A promise that resolves to the role of the user.
	 * @returns string, the role of the user
	 */
	async createRole(): Promise<string> {
		const role = "gebruiker";
		return role;
	}

	/**
	 * Creates a new user in the database.
	 * @param registerData - The data to create the user with.
	 */
	async createUser(registerData: RegisterData) {
		// call on functions from crudInterface to create account in the database
		await this.crudInterface.createUser(registerData);
	}

	/**
	 * Creates a new (hashed) password in the database.
	 * @param passwordData - The data to create the password with.
	 */
	async createPassword(passwordData: Password) {
		await this.crudInterface.createPassword(passwordData);
	}
}
