import { PasswordServiceHandler } from "../Business/Service/password/passwordServiceHandler";
import { SessionService } from "../Business/Service/sessionService";
import { LoginData } from "../Business/Model/MysqlModels/login";
/**
 * @author Dannique Klaver
 *
 * @class LoginController
 * @description This class is responsible for handling the login routes.
 */
export class LoginController {
	// vorm van encapsulation
	constructor(
		private passwordServiceHandler: PasswordServiceHandler,
		private sessionService: SessionService
	) {}

	/**
	 * @author Dannique Klaver
	 * @description This method validates the user's login credentials and returns a session token if the credentials are correct.
	 *
	 * @param {express.Request} req - The request object, containing the user's credentials in req.body.
	 * @param {express.Response} res - The response object, used to send a response to the client.
	 * @returns {Promise<void>} - A promise that resolves when the login credentials have been validated.
	 */
	async validateLogin(req: any, res: any) {
		try {
			// Create a new LoginData object with the user's email and password.
			const loginData = new LoginData(req.body.email, req.body.password);
			// Check if the user's email and password are valid.
			const isPasswordCorrect =
				await this.passwordServiceHandler.handlePasswordService(loginData, res);

			/**
			 * @author RAMON,
			 * Here we create a session and create a cookie wich we send back to the frontend with a redirect to the homepage
			 */
			if (isPasswordCorrect) {
				const dateExpiryTime =
					Number(process.env.SESSION_EXPIRY_TIME) || 360000000;
				let date = new Date(Date.now() + dateExpiryTime);
				res.cookie(
					"sessionId",
					await this.sessionService.createSession(loginData.getEmail(), date),
					{ expires: date, httpOnly: true, sameSite: true }
				);
				res.status(200).json({ redirect: "/home" });
			} else {
				// if validPasswordData is null or isPasswordCorrect is false, return an error.
				throw new Error("Incorrect password, please try again");
			}
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
}
