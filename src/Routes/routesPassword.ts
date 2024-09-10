import express from "express";
import { app } from "../server";
import { PasswordCrud } from "../Data/crud/passwordCrud";
import { PasswordValidationService } from "../Business/Service/password/passwordValidationService";
import { LoginController } from "../Controller/passwordController";
import { PasswordServiceHandler } from "../Business/Service/password/passwordServiceHandler";
import { EmailValidationService } from "../Business/Service/password/emailValidationService";
import { UserValidationService } from "../Business/Service/password/userValidationService";
import { PasswordQueryService } from "../Business/Service/password/passwordQueryService";
import { selectDataLayer } from "../Util/dataLayerSelector";
import { PasswordSequelizeMysql } from "../Data/models/password/passwordSequelize";
import { PasswordMysql } from "../Data/models/password/passwordMysql";
import { SessionService } from "../Business/Service/sessionService";
import { SessionCrud } from "../Data/crud/sessionCrud";
import { SessionSequelize } from "../Data/models/session/sessionSequelize";
import { SessionMysql } from "../Data/models/session/sessionMysql";
import { checkIfAlreadyLoggedIn } from "../Util/CheckifAlreadyLoggedIn";
import { sessionMiddleware } from "../Util/middleware";

/**
 * @author Dannique Klaver
 * @description This class makes routes for the login class
 * @methods makeLoginRoute() makes a post route for the login
 * @methods loginRoutes() calls the makeLoginRoute() method
 */
export class RoutesPassword {
	// Tight Cohesion: All the services and dependencies related to password handling are grouped together in this class.
	private dataLayer = selectDataLayer<PasswordSequelizeMysql, PasswordMysql>(
		PasswordSequelizeMysql,
		PasswordMysql
	);
	private sessionDataLayer = selectDataLayer<SessionSequelize, SessionMysql>(
		SessionSequelize,
		SessionMysql
	);
	private passwordCrudInstance = new PasswordCrud(this.dataLayer);
	private passwordQueryService = new PasswordQueryService(
		this.passwordCrudInstance
	);
	private emailValidationService = new EmailValidationService();
	private passwordValidationService = new PasswordValidationService();
	private userValidationService = new UserValidationService();
	private passwordServiceHandler = new PasswordServiceHandler(
		this.emailValidationService,
		this.passwordValidationService,
		this.userValidationService,
		this.passwordQueryService
	);

	private sessInterface = new SessionCrud(this.sessionDataLayer);
	private sessionService = new SessionService(this.sessInterface);
	private controller = new LoginController(
		this.passwordServiceHandler,
		this.sessionService
	);

	constructor() {}

	makeLoginRoute(): void {
		app.post(
			"/login",
			checkIfAlreadyLoggedIn,
			async (req: express.Request, res: express.Response) => {
				try {
					await this.controller.validateLogin(req, res);
				} catch (error: any) {
					if (
						error.message ===
						"Password is expired, please reset your password or use new password"
					) {
						res.status(400).json({
							error: error.message,
						});
					} else if (error.message === "Incorrect password, please try again") {
						res.status(401).json({
							error: error.message,
						});
					} else {
						res.status(500).json({
							error: "An unexpected error occurred",
						});
					}
				}
			}
		);
	}

	passwordRoutes() {
		this.makeLoginRoute();
	}
}
