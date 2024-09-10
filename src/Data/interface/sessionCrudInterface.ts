import { Session } from "../../Business/Model/MysqlModels/session";

/**
 * @author Ramon iro-omo
 * Interface for the CRUD operations
 */
export interface sessionCrudInterface {
	createSession(
		email: string,
		session: string,
		expiryDate: Date
	): Promise<null | string>;
	getSession(token: string): Promise<Session | null>;
	deleteSession(token: string): Promise<boolean>;
}
