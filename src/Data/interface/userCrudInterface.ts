import { User } from "../../Business/Model/MysqlModels/user";

/**
 * @author Ramon iro-omo
 * Interface for the CRUD operations
 */
export interface userCrudInterface {
	createUser(name: string): Promise<void>;
	getAllUsers(): Promise<void | User[]>;
	updateUser(id: number, name: string): Promise<void>;
	deleteUser(id: number): Promise<void>;
	getUserByEmail(email: string): Promise<undefined | User>;
}
