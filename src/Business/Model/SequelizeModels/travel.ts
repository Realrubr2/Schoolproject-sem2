/**
 * @author Ramon iro-omo
 * @description This file represents the sequelize model of the data being used
 * A better description can be found in the travelVehicle file!
 */
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
	tableName: "travel",
	timestamps: false,
})
export default class TravelSequelize extends Model {
	@Column({
		type: DataType.DATE,
		allowNull: false,
		primaryKey: true,
	})
	declare dateTime: Date;

	@Column({
		type: DataType.STRING(45),
		allowNull: true,
		references: { key: "email", model: "user" },
	})
	declare email: string;

	@Column({
		type: DataType.DATEONLY,
		allowNull: true,
	})
	declare travelDate: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: true,
	})
	declare locationFrom: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: true,
	})
	declare locationTo: string;

	@Column({
		type: DataType.DECIMAL(10, 0),
		allowNull: true,
	})
	declare gco: number;

	@Column({
		type: DataType.ENUM("woon-werk", "zakelijk"),
		allowNull: true,
	})
	declare travelType: string;
}
