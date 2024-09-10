import { Travel } from "../../Business/Model/MysqlModels/travel";

/**
 * @author Ramon iro-omo
 * @modelFactory this class is a facory for the modelclasses with
 * @method createTravel creates a new travel object.
 * T
 */
export class ModelFactory {
	private static instance: ModelFactory;

	private constructor() {}

	static getInstance(): ModelFactory {
		if (!ModelFactory.instance) {
			ModelFactory.instance = new ModelFactory();
		}
		return ModelFactory.instance;
	}

	public createTravel(
		dateTime: Date,
		from: string,
		to: string,
		email: string,
		travelDate: string,
		gco: number,
		travelType: string
	): Travel {
		return new Travel(dateTime, from, to, email, travelDate, gco, travelType);
	}
}
