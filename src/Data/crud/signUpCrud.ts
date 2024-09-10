import { signUpMysql } from "../models/signUp/signUpMysql";
import { signUpSequalize } from "../models/signUp/signUpSequalize";
import { signUpCrudInterface } from "../../Data/interface/signUpCrudInterface";
import { RegisterData } from "../../Business/Model/MysqlModels/registerData";
import { Password } from "../../Business/Model/MysqlModels/password";

/**
 * Represents a CRUD interface for signing up users.
 * @author Britt Rood
 */
export class signUpCrud implements signUpCrudInterface {
	/**
	 * Creates a new instance of the signUpCrud class.
	 * @param dataLayer - The data layer to use.
	 */
	public constructor(private dataLayer: signUpSequalize | signUpMysql) {}

	/**
	 * Checks if a user exists by checking for the email input in the database.
	 * @param email - The email address of the user.
	 * @returns A promise that resolves to a boolean indicating if the user exists.
	 */
	async checkIfUserExists(email: string): Promise<boolean> {
		return await this.dataLayer.checkIfUserExists(email);
	}

	/**
	 * Creates a new user with the specified details.
	 * @param registerData - The registration data of the user.
	 * @returns A promise that resolves to a boolean indicating if the user was created.
	 */
	async createUser(registerData: RegisterData): Promise<boolean> {
		return await this.dataLayer.createUser(registerData);
	}

	/**
	 * Creates a new password with the specified details.
	 * @param passwordData - The password data of the user.
	 * @returns A promise that resolves to a boolean indicating if the password was created.
	 */
	async createPassword(passwordData: Password): Promise<boolean> {
		return await this.dataLayer.createPassword(passwordData);
	}
}
