import { Session } from "../../../Business/Model/MysqlModels/session";
import SessionSequelizeModel from "../../../Business/Model/SequelizeModels/session";
import { sessionCrudInterface } from "../../interface/sessionCrudInterface";

/**
 * @author ramon iro-omo
 * @class SessionSequelize
 * this class makes the queries to the databse using the sequelize orm
 */
export class SessionSequelize implements sessionCrudInterface {
	/**
	 * @method createSession
	 * @param email email for the person linked to the session
	 * @param sessionId the session id
	 * @returns the session id
	 */
	async createSession(
		email: string,
		sessionId: string,
		expiryDate: Date
	): Promise<string | null> {
		const result: SessionSequelizeModel | null =
			await SessionSequelizeModel.create({
				email: email,
				sessionId: sessionId,
				expiryDate: expiryDate,
			});
		if (result != null) {
			return result.sessionId;
		} else {
			throw new Error("Failed to set sessionID");
		}
	}
	/**
	 * @method getSession Gets the session from the database
	 * @param sessionId  the id of the session
	 * @returns The session found
	 */
	async getSession(session: string): Promise<Session | null> {
		const sessionID: SessionSequelizeModel | null =
			await SessionSequelizeModel.findOne({ where: { sessionId: session } });
		if (sessionID != null) {
			return new Session(
				sessionID.email,
				sessionID.sessionId,
				sessionID.expiryDate
			);
		} else {
			return null;
		}
	}
	/**
	 * @method deleteSession Deletes the session from the database
	 * @param sessionId session id
	 * @returns  a true or a false
	 */
	async deleteSession(session: string): Promise<boolean> {
		const deletedSession: number | null = await SessionSequelizeModel.destroy({
			where: { sessionid: session },
		});

		if (deletedSession != 0) {
			return true;
		} else {
			return false;
		}
	}
}
