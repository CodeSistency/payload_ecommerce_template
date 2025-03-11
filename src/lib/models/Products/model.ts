import { ModelType } from "../types";
import { EndpointType, endpoint } from "./endpoint";
import { SchemaType, schema } from "./schema";

const key = "Products";

export const ProductsModel: ModelType<
	typeof key,
	EndpointType,
	SchemaType
> = {
	key,
	endpoint,
	schema,
};
