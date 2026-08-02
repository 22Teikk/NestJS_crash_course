import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        // Parse to int with base 10
        const id = parseInt(value, 10);
        if (isNaN(id)) {
            throw new BadRequestException(`ID must be a number, but got ${value}`);
        } else if (id < 0) {
            throw new BadRequestException('ID must be a positive number');
        }
        return id;
    }
}