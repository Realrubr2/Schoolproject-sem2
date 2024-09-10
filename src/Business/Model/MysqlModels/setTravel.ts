import { setTravel } from "../Interfaces/setTravel";

export class SetTravel implements setTravel {
	setTravelName: string;
	email: string;
	dateTime: string;

	constructor(setTravelName: string, dateTime: string, email: string) {
		this.setTravelName = setTravelName;
		this.email = email;
		this.dateTime = dateTime;
	}
}
