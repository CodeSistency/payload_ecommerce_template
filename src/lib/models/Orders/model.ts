import { ModelType } from "../types";
import { EndpointType, endpoint } from "./endpoint";
import { SchemaType, schema } from "./schema";

const key = "Orders";

export const OrdersModel: ModelType<
	typeof key,
	EndpointType,
	SchemaType
> = {
	key,
	endpoint,
	schema,
};
