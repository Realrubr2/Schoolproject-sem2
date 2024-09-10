import { RelationalDatabase } from "../../../Util/relationalDatabase";
import { RowDataPacket } from "mysql2";
import { signUpCrudInterface } from "../../interface/signUpCrudInterface";
import { RegisterData } from "../../../Business/Model/MysqlModels/registerData";
import { Password } from "../../../Business/Model/MysqlModels/password";

/**
 * Represents a class that provides MySQL implementation for sign up functionality.
 * @author Britt Rood
 */
export class signUpMysql implements signUpCrudInterface {
	/**
	 * The connection pool to use for the database.
	 */
	private pool = RelationalDatabase.getPool();

	/**
	 * Checks if a user exists by checking for the email input in the database.
	 * @param email - The email address of the user.
	 * @returns A promise that resolves to a boolean indicating if the user exists.
	 */
	async checkIfUserExists(email: string): Promise<boolean> {
		let returnValue: boolean = false;
		if (this.pool) {
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>("SELECT * FROM `user` WHERE `email` = ?", [
						email,
					]);
				if (results[0]) {
					returnValue = true;
				}
			} catch (error) {
				console.log(error);
			}
		}
		return returnValue;
	}

	/**
	 * Creates a new user with the specified details.
	 * @param registerData - The registration data of the user.
	 * @returns A promise that resolves to a boolean indicating if the user was created successfully.
	 */
	async createUser(registerData: RegisterData): Promise<boolean> {
		let returnValue: boolean = false;
		if (this.pool) {
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>(
						"INSERT INTO `user` (`email`, `department`, `role`) VALUES (?, ?, ?)",
						[
							registerData.getEmail(),
							registerData.getDepartment(),
							registerData.getRole(),
						]
					);
				if (results) {
					returnValue = true;
				}
			} catch (error) {
				console.log(error);
			}
		}
		return returnValue;
	}

	/**
	 * Creates a new password with the specified details.
	 * @param passwordData - The password data of the user.
	 * @returns A promise that resolves to a boolean indicating if the password was created successfully.
	 */
	async createPassword(passwordData: Password): Promise<boolean> {
		let returnValue: boolean = false;
		if (this.pool) {
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>(
						"INSERT INTO `password` (`registerDate`, `email`, `hashedPassword`, `expiryDate`) VALUES (?, ?, ?, ?)",
						[
							passwordData.getRegisterDate(),
							passwordData.getEmail(),
							passwordData.getHashedPassword(),
							passwordData.getExpiryDate(),
						]
					);
				if (results) {
					returnValue = true;
				}
			} catch (error) {
				console.log(error);
			}
		}
		return returnValue;
	}
}
