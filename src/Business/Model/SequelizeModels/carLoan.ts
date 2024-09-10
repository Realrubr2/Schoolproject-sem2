import {
	BelongsTo,
	Column,
	DataType,
	Model,
	Table,
} from "sequelize-typescript";
import BusinessVehicleSequelize from "../SequelizeModels/businessVehicle";

/**
 * @author Storm Verwer
 */

@Table({
	tableName: "carloan",
	timestamps: false,
})
export default class CarLoanSequelize extends Model {
	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		references: { key: "email", model: "user" },
		primaryKey: true,
	})
	declare email: string;

	@Column({
		type: DataType.STRING(10),
		allowNull: false,
		primaryKey: true,
		references: { key: "licensePlate", model: "businessvehicle" },
	})
	declare licensePlate: string;

	@Column({
		type: DataType.DATEONLY,
		allowNull: false,
	})
	declare startDate: Date;

	@Column({
		type: DataType.DATEONLY,
		allowNull: false,
	})
	declare endDate: Date;

	/**
	 * @description
	 * Represents the relationship between the car loan and the business vehicle.
	 * The @BelongsTo decorator establishes a many-to-one relationship from carLoanSequelize to businessVehicleSequelize.
	 * This means that many carLoanSequelize instances can be associated with one businessVehicleSequelize.
	 * The { foreignKey: 'licensePlate', targetKey: 'licensePlate' } option specifies that the 'licensePlate' field in the carLoanSequelize model is the foreign key for this relationship, and it references the 'licensePlate' field in the businessVehicleSequelize model.
	 */
	@BelongsTo(() => BusinessVehicleSequelize, {
		foreignKey: "licensePlate",
		targetKey: "licensePlate",
	})
	businessVehicle!: BusinessVehicleSequelize;
}
