import { locationInterface } from "../Interfaces/location";

export class Location implements locationInterface {
	email: string;
	location: string;

	constructor(email: string, location: string) {
		this.email = email;
		this.location = location;
	}
}
