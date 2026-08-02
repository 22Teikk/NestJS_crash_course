import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto, PropertyType } from './dto/createProperty.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import * as createPropertyZodDto from './dto/createPropertyZod.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';

@Controller('property')
export class PropertyController {
    @Get()
    findAll() {
        return "This action returns all property";
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createPropertyZodDto.createPropertySchema))
    create(@Body() body: createPropertyZodDto.CreatePropertyZodDto) {
        return "This action adds a new property " + body;
    }

    @Patch(':id')
    update(
        @Param("id", ParseIdPipe) id,
        @Body(
            new ValidationPipe({
                // Remove any properties that are not in the DTO
                whitelist: true,
                // Return an error if any properties are not in the DTO
                forbidNonWhitelisted: true,
                groups: [PropertyType.Update],
                transform: true,
                transformOptions: {
                    // Allow implicit conversion of types, e.g. string to number
                    enableImplicitConversion: true
                }
            })
        ) body: CreatePropertyDto) {
        return `This action update property ${id} with data: ${body}`;
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return `This action returns a #${id} property`;
    }
}
