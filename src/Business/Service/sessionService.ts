import { v4 as uuidv4 } from "uuid";
import { sessionCrudInterface } from "../../Data/interface/sessionCrudInterface";
import { Session } from "../Model/MysqlModels/session";

export class SessionService {
	constructor(private sessionCrudInterface: sessionCrudInterface) {}
	/**
	 * @method createSession creates a sessionId and sends it togehter with the email of the user to the sessions
	 * table in the database
	 * the trow new error will not be sent to the frontend
	 */
	public async createSession(
		email: string,
		expiryDate: Date
	): Promise<string | null> {
		let sessionId = uuidv4();
		try {
			return await this.sessionCrudInterface.createSession(
				email,
				sessionId,
				expiryDate
			);
		} catch (error) {
			throw new Error("cannot create session");
		}
	}
	/**
	 * @method findSession tries to find the session and returns the datalayer
	 * @param session sessionId
	 * @returns  a session, if the session is not found it return null
	 */
	public async findSession(sessionId: string): Promise<Session | null> {
		if (!sessionId) {
			throw new Error("Session id is empty");
		} else {
			return await this.sessionCrudInterface.getSession(sessionId);
		}
	}

	/**
	 *
	 * @param sessionId sessionId
	 * @returns the session if it is not null
	 */
	public async doesSessionExist(sessionId: string): Promise<boolean> {
		const session = await this.findSession(sessionId);
		return session !== null;
	}
	/**
	 * @method isSessionExpired checks if the expiry date of the session is bigger than the present date
	 * if that is the case it will return true
	 * @param sessionId sessionId wich is a string
	 * @returns true or returns false
	 */
	async isSessionExpired(sessionId: string): Promise<boolean> {
		const session: Session | null = await this.findSession(sessionId);
		if (session) {
			return session.expiryDate < new Date();
		} else {
			return false;
		}
	}
	/**
	 *
	 * @param session sessionId
	 * @returns R
	 */
	async deleteSession(sessionId: string): Promise<boolean> {
		try {
			return await this.sessionCrudInterface.deleteSession(sessionId);
		} catch (error) {
			throw new Error("cannot delete the session");
		}
	}
}
