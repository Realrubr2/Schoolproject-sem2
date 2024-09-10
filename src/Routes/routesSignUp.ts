import express from "express";
import { app } from "../server";
import { SignUpController } from "../Controller/signUpController";
import { signUpService } from "../Business/Service/signUp/signUpServiceHandler";
import { signUpSequalize } from "../Data/models/signUp/signUpSequalize";
import { signUpMysql } from "../Data/models/signUp/signUpMysql";
import { selectDataLayer } from "../Util/dataLayerSelector";
import { signUpCrud } from "../Data/crud/signUpCrud";
import { PasswordCheckService } from "../Business/Service/signUp/passwordCheckService";
import { SignUpEmailValidationService } from "../Business/Service/signUp/signUpEmailService";
import { signUpDateService } from "../Business/Service/signUp/dateService";
import { sessionMiddleware } from "../Util/middleware";

/**
 * Routes for the sign up page
 * @author Britt Rood
 */
export class RoutesSignUp {
	/**
	 * The data layer to use.
	 */
	private dataLayer = selectDataLayer<signUpSequalize, signUpMysql>(
		signUpSequalize,
		signUpMysql
	);

	private crud = new signUpCrud(this.dataLayer);
	private passwordCheckService = new PasswordCheckService();
	private signUpEmailValidationService = new SignUpEmailValidationService(
		this.crud
	);
	private signUpDateService = new signUpDateService();
	private service = new signUpService(
		this.crud,
		this.passwordCheckService,
		this.signUpEmailValidationService,
		this.signUpDateService
	);

	private controller = new SignUpController(this.service);

	constructor() {}

	/**
	 * Creates the routes for the sign up page.
	 */
	createRoutes(): void {
		app.post("/signup", async (req: express.Request, res: express.Response) => {
			try {
				await this.controller.validateSignUp(req, res);
			} catch (error: any) {
				res.status(500).json({
					error: "An unexpected error occurred",
				});
			}
		});
	}

	signUpRoutes() {
		this.createRoutes();
	}
}
