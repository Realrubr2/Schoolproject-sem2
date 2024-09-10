/**
 * Interface for the sign up data
 * @param email - the email input of the user
 * @param department - the department input of the user
 * @param password - the password input of the user
 * @param passwordRepeat - the repeated password input of the user
 * @returns signUpData
 *
 * @author Britt Rood
 */

export interface signUpData {
	email: string;
	department: string;
	password: string;
	passwordRepeat: string;
}
