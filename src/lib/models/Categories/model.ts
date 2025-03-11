import { ModelType } from "../types";
import { EndpointType, endpoint } from "./endpoint";
import { SchemaType, schema } from "./schema";

const key = "Categories";

export const CategoriesModel: ModelType<
	typeof key,
	EndpointType,
	SchemaType
> = {
	key,
	endpoint,
	schema,
};
