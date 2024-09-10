/**
 * @author Dannique Klaver
 * @description This class is responsible for converting raw data from the database into model instances.
 *
 * @principle Polymorphism.
 * Polymorphism allows objects of different types to be processed in the same way as long as they support a common interface.
 * In this case, the function can handle any type of Sequelize model, as long as the correct attributes are provided.
 */

/**
 * @author Dannique Klaver
 * @description Converts a single raw data object from the database into a model instance.
 *
 * @param {any} rowData - The raw data from the database.
 * @param {string[]} modelAttributes - The attributes of the model.
 * @returns {T | null} Returns a model instance if the conversion is successful, or null if the conversion fails.
 */
export function convertRowDataToModel<T>(
	rowData: any,
	modelAttributes: string[],
	ModelClass: new (...args: any[]) => T
): T | null {
	// Check if rowData exists
	if (rowData) {
		// Create an array to hold the constructor arguments
		let constructorArgs: any[] = [];

		modelAttributes.forEach((attribute: string) => {
			if (attribute in rowData) {
				// Add the attribute value to the constructor arguments
				constructorArgs.push(rowData[attribute]);
			} else {
				console.error(`Attribute ${attribute} does not exist in rowData`);
				return null;
			}
		});

		// Create a new instance of the model class with the constructor arguments
		return new ModelClass(...constructorArgs);
	}

	return null;
}
/**
 * @author Dannique Klaver
 * @description Converts raw data from the database into an array of model instances.
 *
 * @param {any} rowDataPacket - The raw data from the database.
 * @param {string[]} modelAttributes - The attributes of the model.
 * @returns {T[]} Returns an array of model instances if the conversion is successful, or an empty array if the conversion fails.
 */
export function convertRowDataToModels<T>(
	rowDataPacket: any,
	modelAttributes: string[],
	ModelClass: new (...args: any[]) => T
): T[] {
	// Initialize an empty array to hold the model instances
	const models: T[] = [];

	// Loop over each element in the raw data
	rowDataPacket.forEach((element: any) => {
		// Convert the element to a model instance
		const modelInstance = convertRowDataToModel<T>(
			element,
			modelAttributes,
			ModelClass
		);
		// If the conversion was successful, push the model instance to the models array
		if (modelInstance) {
			models.push(modelInstance);
		}
	});

	// Return the array of model instances
	return models;
}
