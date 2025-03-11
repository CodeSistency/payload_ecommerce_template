import { z } from "zod";
import { schema } from "./schema";


export type LoginSchemaType = z.infer<
	typeof schema.login
>;
export type RegisterSchemaType = z.infer<
	typeof schema.register
>;

export type CreateUserSchema = z.infer<typeof schema.createUserSchema>;

export type UpdateUserSchema = z.infer<typeof schema.updateUserSchema>;
