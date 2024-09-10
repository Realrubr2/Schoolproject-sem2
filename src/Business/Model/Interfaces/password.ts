export interface password {
	getRegisterDate(): Date;
	getEmail(): string;
	getHashedPassword(): string;
	getExpiryDate(): Date;
}
