import { travel } from "../Interfaces/travel";

export class Travel implements travel {
	dateTime: Date;
	from: string;
	to: string;
	email: string;
	travelDate: string;
	gco: number;
	travelType: string;

	constructor(
		dateTime: Date,
		from: string,
		to: string,
		email: string,
		travelDate: string,
		gco: number,
		travelType: string
	) {
		this.dateTime = dateTime;
		this.from = from;
		this.to = to;
		this.email = email;
		this.travelDate = travelDate;
		this.gco = gco;
		this.travelType = travelType;
	}
}
