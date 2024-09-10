import { Request, Response, NextFunction } from "express";
import { SessionService } from "../Business/Service/sessionService";
import { sessionCrudInterface } from "../Data/interface/sessionCrudInterface";
import { SessionCrud } from "../Data/crud/sessionCrud";
import { SessionSequelize } from "../Data/models/session/sessionSequelize";
import { selectDataLayer } from "./dataLayerSelector";
import { SessionMysql } from "../Data/models/session/sessionMysql";
/**
 * @author ramon iro-omo
 * @description this function is a middle ware for express the function checks if the user is on the login page and
 * if his session exists the user will then be redirect to homepage
 * -- this function can also be alterd that user only can acces pages if they have sessions
 * @param req express request
 * @param res express response
 * @param next next function from express lets express know that it can look further
 */
export async function checkIfAlreadyLoggedIn(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const sessionId = req.cookies.sessionId;
	const sessionDataLayer = selectDataLayer<SessionSequelize, SessionMysql>(
		SessionSequelize,
		SessionMysql
	);
	if (sessionId) {
		const sessionCrud: sessionCrudInterface = new SessionCrud(sessionDataLayer);
		const sessionService: SessionService = new SessionService(sessionCrud);
		let sessionExists = await sessionService.findSession(sessionId);
		if (req.originalUrl == "/login" && sessionExists !== null) {
			res.status(200).json({ redirect: "/home" });
		} else {
			next();
		}
	} else {
		next();
	}
}
