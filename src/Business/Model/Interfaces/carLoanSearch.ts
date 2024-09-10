/**
 * @author Storm Verwer
 */
import { iDateSearch } from "./dateSearch";

export interface iCarLoanSearch extends iDateSearch {
	get _fuelType(): string | undefined;
}
