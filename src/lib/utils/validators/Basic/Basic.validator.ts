import { z } from "@/lib/zod";

export const amountValidator = z.object({
	amount: z.string()
		.min(1, { message: "El monto ingresado es inválido" })
		.transform((value) => {
			const str = value.trim();
			if (str.includes(",")) {
				const numberFloat = parseFloat(str.replace(",", ".")).toFixed(2);
				return parseFloat(numberFloat);
			} else {
				return parseInt(str, 10);
			}
		}),
});

export const amountOptionalValidator = z.object({
	amount: z.string()
		.optional()
		.transform((value) => {
			if (value) {
				const str = value.trim();
				if (str.includes(",")) {
					const numberFloat = parseFloat(str.replace(",", ".")).toFixed(2);
					return parseFloat(numberFloat);
				} else {
					return parseInt(str, 10);
				}
			}
		}),
});

export const idValidator = z.object({
	id: z.number().positive(),
});

export const descriptValidator = z.object({
	descript: z.string().min(1).max(150),
});

export const nameValidator = z.object({
	name: z.string().min(1).max(150),
});

export const dateValidator = z.object({
	date: z.date(),
});
