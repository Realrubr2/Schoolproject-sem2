import { RelationalDatabase } from "../../../Util/relationalDatabase";
import { RowDataPacket } from "mysql2";
import { userCrudInterface } from "../../interface/userCrudInterface";
import { User } from "../../../Business/Model/MysqlModels/user";

export class UserMysql implements userCrudInterface {
	private pool = RelationalDatabase.getPool();

	async createUser(name: string): Promise<void> {
		throw new Error("not implemented");
	}
	async getAllUsers(): Promise<void> {
		// Read a user from the database
	}
	async updateUser(id: number, name: string): Promise<void> {
		// Update a user in the database
	}
	async deleteUser(id: number): Promise<void> {
		// Delete a user from the database
	}

	/**
	 * @author Dax Riool
	 */
	async getUserByEmail(email: string): Promise<User | undefined> {
		let returnValue: undefined | User = undefined;
		if (this.pool) {
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>("SELECT * FROM `user` where email = ?", [
						email,
					]);
				if (results[0]) {
					returnValue = results[0] as User;
				}
			} catch (error) {
				console.log(error);
			}
		}
		return returnValue;
	}
}
