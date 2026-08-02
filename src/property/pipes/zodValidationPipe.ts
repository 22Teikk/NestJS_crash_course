import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { ZodType } from "zod";

export class ZodValidationPipe implements PipeTransform {
    constructor(private readonly schema: ZodType<any>) { }
    transform(value: any, metadata: ArgumentMetadata) {
        const parsedValue = this.schema.safeParse(value);
        if (parsedValue.success) {
            return parsedValue;
        } else {
            throw new BadRequestException(parsedValue.error.issues[0].message);
        }
    }
}