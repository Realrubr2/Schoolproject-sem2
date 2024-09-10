import { signUpService } from "../Business/Service/signUp/signUpServiceHandler";
import { signUpData } from "../Business/Model/MysqlModels/signUpData";

/**
 * Represents a controller for the sign up page.
 * Handles the validation of the sign up form data and redirects the user to the login page if the sign up is successful.
 * If the sign up is unsuccessful, an error message is returned to the user.
 * @author Britt Rood
 */
export class SignUpController {
	constructor(private signUpService: signUpService) {}

	/**
	 * Validates the sign up form data and redirects the user to the login page if the sign up is successful.
	 * @param req sign up request
	 * @param res status response
	 */
	async validateSignUp(req: any, res: any) {
		try {
			const signUpInformation = new signUpData(
				req.body.email,
				req.body.department,
				req.body.password,
				req.body.passwordRepeat
			);

			/**
			 * Here the handleSignUpService method from the signUpServiceHandler class is called to handle the sign up process.
			 */
			const handleSignUp = await this.signUpService.handleSignUpService(
				signUpInformation
			);

			/**
			 * If the handleSignUpService method returns true, the user is redirected to the login page.
			 * If the handleSignUpService method returns false, an error message is returned to the user.
			 * If an error occurs, an error message is returned to the user.
			 *
			 * @returns {Promise<void>} - A promise that resolves when the sign up process has been handled.
			 */
			if (handleSignUp) {
				res.status(200).json({ redirect: "/login" });
			} else {
				res.status(500).json({ error: "An unexpected error occurred" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
