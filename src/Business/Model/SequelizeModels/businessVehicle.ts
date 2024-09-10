import {
	BelongsTo,
	Column,
	DataType,
	HasMany,
	Model,
	Table,
} from "sequelize-typescript";
import CarLoanSequelize from "./carLoan";

/**
 * @author Storm Verwer
 */

@Table({
	tableName: "businessvehicle",
	timestamps: false,
})
export default class BusinessVehicleSequelize extends Model {
	@Column({
		type: DataType.STRING(10),
		allowNull: false,
		primaryKey: true,
	})
	declare licensePlate: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		references: { key: "vehicleType", model: "vehicletype" },
	})
	declare vehicleType: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		references: { key: "fuelType", model: "vehicletype" },
	})
	declare fuelType: string;

	/**
	 * The car loans associated with this vehicle.
	 * This is a one-to-many relationship: one vehicle can have many car loans.
	 * The "foreignKey" option specifies that the "licensePlate" field in the "carLoanSequelize" table is the foreign key for this relationship.
	 */
	@HasMany(() => CarLoanSequelize, { foreignKey: "licensePlate" })
	carLoan!: CarLoanSequelize[];
}
