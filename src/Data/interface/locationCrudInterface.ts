import { Location } from "../../Business/Model/MysqlModels/location";

export interface locationCrudInterface {
	getAllLocationsOfUserByEmail(email: string): Promise<null | Location[]>;
}
