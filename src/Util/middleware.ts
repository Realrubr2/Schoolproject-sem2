import { Request, Response, NextFunction } from "express";
import { SessionService } from "../Business/Service/sessionService";
import { SessionCrud } from "../Data/crud/sessionCrud";
import { SessionSequelize } from "../Data/models/session/sessionSequelize";
import { SessionMysql } from "../Data/models/session/sessionMysql";
import { selectDataLayer } from "./dataLayerSelector";
import { sessionCrudInterface } from "../Data/interface/sessionCrudInterface";

/**

 @author ramon iro-omo
 @description checks if the user is logged in and redirect the user to the login page if he isnt this will run each time
 express gets a request. the cookie will be cleared from the user if it is expired using clear cookie and deleting it from the DB
@param {Request} req - The request object.
@param {Response} res - The response object.
@param {NextFunction} next - The next function to call in the middleware chain.
@returns {void}
*/

export async function sessionMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const sessionId = req.cookies.sessionId;
	const sessionDataLayer = selectDataLayer<SessionSequelize, SessionMysql>(
		SessionSequelize,
		SessionMysql
	);

	if (req.originalUrl !== "/login" && req.originalUrl !== "/signup") {
		if (sessionId) {
			const sessionCrud: sessionCrudInterface = new SessionCrud(
				sessionDataLayer
			);
			const sessionService: SessionService = new SessionService(sessionCrud);
			let sessionExists = await sessionService.findSession(sessionId);
			if (sessionExists !== null) {
				let sessionExpired = await sessionService.isSessionExpired(sessionId);
				if (sessionExpired) {
					await sessionService.deleteSession(sessionId);
					response(req, res);
				} else {
					next();
				}
			} else {
				res.status(401).clearCookie("sessionId").end();
			}
		} else {
			res.status(401).end();
		}
	} else {
		next();
	}
}

function response(req: Request, res: Response) {
	res
		.status(403)
		.clearCookie("sessionId", {
			path: "/",
			secure: false,
			httpOnly: true,
			sameSite: true,
		})
		.end();
}
