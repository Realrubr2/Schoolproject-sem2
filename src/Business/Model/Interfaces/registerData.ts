/**
 * Interface for the register data
 * @param email - the email input of the user
 * @param department - the department input of the user
 * @param role - the role of the user
 * @param registerDate - the date of registration
 * @param hashedPassword - the hashed password of the user
 * @param expiryDate - the date of expiry
 * @returns register
 *
 * @author Britt Rood
 */

export interface register {
	getEmail(): string;
	getDepartment(): string;
	getRole(): string;
	getRegisterDate(): Date;
	getHashedPassword(): string;
	getExpiryDate(): Date;
}
