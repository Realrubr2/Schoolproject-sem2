/**
 * @author Ramon iro-omo
 * @description This file represents the sequelize model of the data being used
 * A better description can be found in the travelVehicle file!
 */
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
	tableName: "setTravel",
	timestamps: false,
})
export default class SetTravelSequelize extends Model {
	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		primaryKey: true,
	})
	declare setTravelName: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		primaryKey: true,
		references: { key: "email", model: "user" },
	})
	declare email: string;

	@Column({
		type: DataType.DATE,
		allowNull: false,
		references: { key: "dateTime", model: "travelvehicle" },
	})
	declare dateTime: Date;
}
