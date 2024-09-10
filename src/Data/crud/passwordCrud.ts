import { PasswordMysql } from "../models/password/passwordMysql";
import { PasswordSequelizeMysql } from "../models/password/passwordSequelize";
import { passwordCrudInterface } from "../../Data/interface/passwordCrudInterface";
import { Password } from "../../Business/Model/MysqlModels/password";

/**
 * @author Dannique Klaver
 * @description This class implements the CRUD operations for the login and checks for wich datalayer is used
 */
export class PasswordCrud implements passwordCrudInterface {
	// Loose Coupling: The passwordCrud class is not tightly coupled to a specific data layer.
	// It can work with either PasswordSequelizeMysql or PasswordMysql.

	//controls which data layer is used
	public constructor(
		private dataLayer: PasswordSequelizeMysql | PasswordMysql
	) {}

	async createPassword(name: string): Promise<void> {
		// Create a new password registration in the database
	}

	async getPasswordsByEmail(email: string): Promise<Password[]> {
		return (await this.dataLayer.getPasswordsByEmail(email)) as Password[];
	}

	async updatePassword(): Promise<void> {
		// Update a login in the database
	}

	async deletePassword(): Promise<void> {
		// Delete a login from the database
	}
}
