/**
 * @author Ramon iro-omo
 * @description This file represents the sequelize model of the data being used
 * A better description can be found in the travelVehicle file!
 */
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
	tableName: "location",
	timestamps: false,
})
export default class LocationSequelize extends Model {
	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		primaryKey: true,
	})
	declare location: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		references: { key: "email", model: "user" },
		primaryKey: true,
	})
	declare email: string;
}
