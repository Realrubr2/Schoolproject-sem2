import { Column, DataType, Index, Model, Table } from "sequelize-typescript";

/**
 * @index data structure is added so that the databse can quickly retrieve fuelType
 */
@Table({
	tableName: "vehicletype",
	timestamps: false,
})
export default class VehicleTypeSequelize extends Model {
	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		primaryKey: true,
	})
	declare vehicleType: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		primaryKey: true,
	})
	@Index
	declare fuelType: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
	})
	declare gcorkm: number;
}
