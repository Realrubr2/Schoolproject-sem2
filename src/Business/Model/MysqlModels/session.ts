import { session } from "../Interfaces/session";
export class Session implements session {
	sessionId: string;
	email: string;
	expiryDate: Date;
	constructor(email: string, sessionId: string, expiryDate: Date) {
		this.email = email;
		this.sessionId = sessionId;
		this.expiryDate = expiryDate;
	}
}
