import { Password } from "../../Business/Model/MysqlModels/password";

/**
 * @author Dannique Klaver
 * @description Interface for the password CRUD operations
 */
export interface passwordCrudInterface {
	getPasswordsByEmail(email: string): Promise<Password[]>;
}
