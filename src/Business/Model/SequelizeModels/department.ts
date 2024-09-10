/**
 * @author Ramon iro-omo
 * @description This file represents the sequelize model of the data being used
 * A better description can be found in the travelVehicle file!
 */
import { Column, DataType, Model, Table, Index } from "sequelize-typescript";
/**
 * @index data structure is added so that the databse can quickly retrieve department and youll get an error if you dont because mysql does not like it
 */
@Table({
	tableName: "department",
	timestamps: false,
})
export default class DepartmentSequelize extends Model {
	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	@Index
	declare department: string;
}
