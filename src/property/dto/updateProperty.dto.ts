import { PartialType } from "@nestjs/swagger";
import { CreatePropertyDto } from "./createProperty.dto";
import { createPropertySchema } from "./createPropertyZod.dto";
import z from "zod";

export const updatePropertySchema = createPropertySchema.partial();

export type UpdatePropertyDto = z.infer<typeof updatePropertySchema>;