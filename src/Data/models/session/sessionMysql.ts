import { ResultSetHeader, RowDataPacket } from "mysql2";
import { RelationalDatabase } from "../../../Util/relationalDatabase";
import { Pool } from "mysql2/typings/mysql/lib/Pool";
import { sessionCrudInterface } from "../../interface/sessionCrudInterface";
import { Session } from "../../../Business/Model/MysqlModels/session";
import { convertRowDataToModel } from "../../../Util/Factory/rowDataModelFactory";

/**
 * @author Ramon iro-omo
 * @class sessionMysql
 * this class handles the queries for the sessions using mysql2
 */
export class SessionMysql implements sessionCrudInterface {
	/**
	 * @method createSession Creates the session for the user
	 * @param email Email to who the session needs to be linked
	 * @param session
	 * @returns The id of the session that was created
	 */
	async createSession(
		email: string,
		sessionId: string,
		expiryDate: Date
	): Promise<string | null> {
		let pool: Pool | null = RelationalDatabase.getPool();
		let results: RowDataPacket[] | null;
		if (pool != null) {
			[results] = await pool
				.promise()
				.execute<RowDataPacket[]>(
					"INSERT INTO session (sessionId, email, expiryDate) VALUES (?, ?, ?)",
					[sessionId, email, expiryDate]
				);
			if (results != null) {
				return sessionId;
			}
		}
		return null;
	}
	/**
	 * @method getSession Gets the session from the database
	 * @param sessionId  the id of the session
	 * @returns The session found
	 */
	async getSession(sessionId: string): Promise<Session | null> {
		let pool: Pool | null = RelationalDatabase.getPool();
		let results: RowDataPacket[] | null = null;
		if (pool != null) {
			[results] = await pool
				.promise()
				.execute<RowDataPacket[]>("SELECT * FROM session WHERE sessionId = ?", [
					sessionId,
				]);
		}
		console.log(JSON.stringify(results));

		if (results != null && results.length > 0) {
			const session = convertRowDataToModel<Session>(
				results[0],
				["email", "sessionId", "expiryDate"],
				Session
			);
			return session;
		}
		return null;
	}

	/**
	 * @method deleteSession Deletes the session from the database
	 * @param sessionId session id
	 * @returns  a true or a false
	 * ANd correcty checks if the Return of the delete is correct or not
	 */
	async deleteSession(sessionId: string): Promise<boolean> {
		let pool: Pool | null = RelationalDatabase.getPool();
		let results: ResultSetHeader | undefined = undefined;
		if (pool != null) {
			[results] = await pool
				.promise()
				.execute<ResultSetHeader>("DELETE FROM session WHERE sessionId = ?", [
					sessionId,
				]);
		}
		if (results && results.affectedRows > 0) {
			return true;
		}
		return false;
	}
}
