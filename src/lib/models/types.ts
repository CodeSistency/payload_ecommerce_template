import { User } from "@/payload-types";


export interface ApiResponse<T> {
	code: number;
	message: string;
	data: T | null;
  }


export interface EntityModelUserType {
	Users: User[];
}


export type EntityModelType =  EntityModelUserType;

export type KeyEntityModelType = keyof EntityModelType;

export type ExtendsKeyEntityModelType<T extends KeyEntityModelType> =
	// Administration
	
		T extends "Users"
		? User
		: never;		



		// : T extends "AdministrationBankAccount"
		// 	? AdministrationBankAccountModelType
		// 	: T extends "AdministrationSupplierCategories"
		// 		? AdministrationSupplierCategoriesModelType
		// 		: T extends "AdministrationSupplierType"
		// 			? AdministrationSupplierTypeModelType
		// 			: never;		
					

export interface ModelType<
	KeyT extends KeyEntityModelType,
	EndpointT,
	SchemaT,
> {
	key: KeyT;
	endpoint: EndpointT;
	schema: SchemaT;
}
