import { Media, Order, Product, User, Category } from "@/payload-types";


export interface ApiResponse<T> {
	code: number;
	message: string;
	data: T | null;
  }


export interface EntityModelUserType {
	Users: User[];
}

export interface EntityModelProductType {
	Products: Product[];
}

export interface EntityModelMediaType {
	Media: Media[];
}

export interface EntityModelOrderType {
	Orders: Order[];
}

export interface EntityModelCategoryType {
	Categories: Category[];
}

export type EntityModelType =  EntityModelUserType &
	EntityModelProductType & 
	EntityModelMediaType & 
	EntityModelOrderType & 
	EntityModelCategoryType;

export type KeyEntityModelType = keyof EntityModelType;

export type ExtendsKeyEntityModelType<T extends KeyEntityModelType> =
	
		T extends "Users"
		? User
		:
		T extends "Products"
		? Product
		:
		T extends "Categories"
		? Category
		: 
		T extends "Orders"
		? Order
		: 
		T extends "Media"
		? Media
		:  never;			
					

export interface ModelType<
	KeyT extends KeyEntityModelType,
	EndpointT,
	SchemaT,
> {
	key: KeyT;
	endpoint: EndpointT;
	schema: SchemaT;
}
