import { UserBySessionService } from "../Business/Service/UserBySessionService";
import { UserService } from "../Business/Service/userService";
import { Request, Response } from "express";

export class UserController {
	public constructor(
		private userService: UserService,
		private userBySessionService: UserBySessionService
	) {}

	/**
	 * Gets alll users
	 * @param req the request object
	 * @param res the response object
	 */
	async getAllUsers(req: Request, res: Response) {
		try {
			const user = await this.userService.getAllUsers();
			res.status(202).json(user);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}

	/**
	 * @description Retrieves a user by email.
	 * @param req the request object
	 * @param res the response object
	 */
	async getUserByEmail(req: Request, res: Response) {
		try {
			const userBySessionService = new UserBySessionService();
			const sessionId = req.cookies.sessionId;

			const email = await userBySessionService.getUserEmailBySession(sessionId);
			if (email) {
				const user = await this.userService.getUserByEmail(req);
				res.status(202).json(user);
			}
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}

	/**
	 * @method logOutUser thism ethod logsout the user useing the userby session service
	 * @param req express request
	 * @param Res express response
	 * It tries to logout the user, if there is any error it will return with a status 500.
	 * The cookie is deleted from the user with the clearCookie function. it takes in the value and the options
	 */
	async logOutUser(req: Request, res: Response): Promise<void> {
		try {
			const logout = await this.userBySessionService.logOutUser(
				req.cookies.sessionId
			);
			if (logout) {
				res
					.status(202)
					.clearCookie("sessionId", {
						path: "/",
						secure: false,
						httpOnly: true,
						sameSite: true,
					})
					.json({ redirect: "/login" });
			}
		} catch (error: any) {
			res.status(401).json({ redirect: "/login" });
		}
	}
}
