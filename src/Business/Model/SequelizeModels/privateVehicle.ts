/**
 * @author Ramon iro-omo
 * @description This file represents the sequelize model of the data being used
 * A better description can be found in the travelVehicle file!
 */
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
	tableName: "privatevehicles",
	timestamps: false,
})
export default class PrivateVehicleSequelize extends Model {
	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		references: { key: "email", model: "user" },
	})
	declare email: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: true,
		references: { key: "vehicleType", model: "vehicletype" },
	})
	declare vehicleType: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: true,
		references: { key: "fuelType", model: "vehicletype" },
	})
	declare fuelType: string;
}
