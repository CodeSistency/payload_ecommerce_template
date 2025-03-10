import { ModelType } from "../types";
import { EndpointType, endpoint } from "./endpoint";
import { SchemaType, schema } from "./schema";

const key = "Users";

export const UsersModel: ModelType<
	typeof key,
	EndpointType,
	SchemaType
> = {
	key,
	endpoint,
	schema,
};
