import { Session } from "../../Business/Model/MysqlModels/session";
import { sessionCrudInterface } from "../interface/sessionCrudInterface";
import { SessionMysql } from "../models/session/sessionMysql";
import { SessionSequelize } from "../models/session/sessionSequelize";

export class SessionCrud implements sessionCrudInterface {
	public constructor(private dataLayer: SessionSequelize | SessionMysql) {}
	/**
	 * @method createSession Creates the session for the user
	 * @param email Email to who the session needs to be linked
	 * @param session
	 * @returns The id of the session that was created
	 */
	public async createSession(
		email: string,
		session: string,
		expiryDate: Date
	): Promise<string | null> {
		return await this.dataLayer.createSession(email, session, expiryDate); // Call the createSession method with the provided arguments.
	}
	/**
	 * @method getSession Gets the session from the database
	 * @param sessionId  the id of the session
	 * @returns The session found
	 */
	public async getSession(session: string): Promise<Session | null> {
		return await this.dataLayer.getSession(session); // Call the getSession method with the provided argument.
	}
	/**
	 * @method deleteSession Deletes the session from the database
	 * @param sessionId session id
	 * @returns  a true or a false
	 */
	public async deleteSession(session: string): Promise<boolean> {
		return await this.dataLayer.deleteSession(session);
	}
}
