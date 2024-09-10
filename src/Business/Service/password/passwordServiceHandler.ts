import { EmailValidationService } from "./emailValidationService";
import { PasswordQueryService } from "./passwordQueryService";
import { PasswordValidationService } from "./passwordValidationService";
import { UserValidationService } from "./userValidationService";
import { LoginData } from "./../../Model/MysqlModels/login";
import { Password } from "../../Model/MysqlModels/password";

export class PasswordServiceHandler {
	constructor(
		private emailValidationService: EmailValidationService,
		private passwordValidationService: PasswordValidationService,
		private userValidationService: UserValidationService,
		private passwordQueryService: PasswordQueryService
	) {}

	async handlePasswordService(loginData: LoginData, res: any) {
		// check if email ends with "@jordit.com" and is using valid email format.
		this.emailValidationService.validateEmail(loginData.getEmail(), res);

		// check if password is shorter than 8 characters or empty, if so, return an error.
		this.passwordValidationService.validatePasswordLength(
			loginData.getPassword(),
			res
		);

		// variable passwordDataArray is an array of password data objects, including expired passwords.
		const passwordDataArray: Password[] =
			await this.passwordQueryService.getPasswordsByEmail(loginData.getEmail());

		this.userValidationService.validateUserRegistration(passwordDataArray, res);

		// passwordData contains the password data object that matches the hashed password.
		const passwordData: Password =
			await this.passwordValidationService.validatePasswordData(
				passwordDataArray,
				loginData.getPassword()
			);

		// isPasswordCorrect is a boolean that indicates whether the password is correct.
		const isPasswordCorrect =
			await this.passwordValidationService.verifyPassword(
				passwordData.getHashedPassword(),
				loginData.getPassword()
			);

		return isPasswordCorrect;
	}
}
