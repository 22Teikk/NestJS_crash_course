import z from "zod";

export const createPropertySchema = z.object({
    name: z.string().min(1, 'Name must be at least 1 character long').max(10, 'Name must be at most 10 characters long'),
    description: z.string().min(2, 'Description must be at least 2 characters long').max(10, 'Description must be at most 10 characters long'),
    area: z.number().positive('Area must be a positive number'),
}).required();

export type CreatePropertyZodDto = z.infer<typeof createPropertySchema>