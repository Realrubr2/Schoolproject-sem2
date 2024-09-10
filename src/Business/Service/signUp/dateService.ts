/**
 * Service for creating the expiry date and register date for a new user.
 * @author Britt Rood
 */
export class signUpDateService {
	/**
	 * creates expiry date for a new users password.
	 * @returns A date object representing the expiry date for a new users password.
	 */
	createExpiryDate() {
		const expiryDate = new Date();
		expiryDate.setFullYear(expiryDate.getFullYear() + 1);
		return expiryDate;
	}

	/**
	 * creates register date for a new user.
	 * @returns A date object representing the register date for a new user.
	 */
	createRegisterDate() {
		const registerDate: Date = new Date();
		return registerDate;
	}
}
