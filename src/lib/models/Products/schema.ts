import { z } from "@/lib/zod";


const login = z.object({
	// username: z.string().min(3, 'Nombre de usuario debe tener al menos 3 caracteres'),
	email: z.string().email('Debe ser un correo válido'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});


const register = z.object({
	username: z.string().min(3, 'Nombre de usuario debe tener al menos 3 caracteres'),
	email: z.string().email('Debe ser un correo válido'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
	role: z.enum(['teacher', 'student'], { required_error: 'El rol es requerido' }).default('student'),
});

  
  const createUserSchema = z.object({
	email: z.string().email("Debe ser un correo electrónico válido"),
	password: z.string().min(1, "La contraseña es obligatoria"),
	user_name: z.string().min(1, "El nombre de usuario es obligatorio"),
	firebaseToken: z.string().optional(),
	name: z.string().min(1, "El nombre es obligatorio"),
	last_name: z.string().min(1, "El apellido es obligatorio"),
	phone: z.string().min(1, "El teléfono es obligatorio"),
	genderId: z.number().int("El ID de género debe ser un número entero"),
	roleId: z.number().int("El ID de rol debe ser un número entero"),
  });

  const updateUserSchema = z.object({
	id: z.number().int("El ID debe ser un número entero"),
	email: z.string().email("Debe ser un correo electrónico válido"),
	password: z.string().min(1, "La contraseña es obligatoria"),
	user_name: z.string().min(1, "El nombre de usuario es obligatorio"),
	firebaseToken: z.string().optional(),
	name: z.string().min(1, "El nombre es obligatorio"),
	last_name: z.string().min(1, "El apellido es obligatorio"),
	phone: z.string().min(1, "El teléfono es obligatorio"),
	genderId: z.number().int("El ID de género debe ser un número entero"),
	roleId: z.number().int("El ID de rol debe ser un número entero"),
  });
  

export const schema = {
	login,
	register,
	createUserSchema,
	updateUserSchema
};

export type SchemaType = typeof schema;
