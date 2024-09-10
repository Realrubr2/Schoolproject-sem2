/**
 * @author Storm Verwer
 */
export interface carLoan {
	get _email(): string;
	get _licensePlate(): string;
	get _startDate(): Date;
	get _endDate(): Date;
}
