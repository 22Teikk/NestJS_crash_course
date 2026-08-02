import { Body, Controller, Get, Headers, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import * as createPropertyZodDto from './dto/createPropertyZod.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';

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
        @Body() body: CreatePropertyDto,
        @RequestHeader(new ValidationPipe({
            whitelist: true,
            validateCustomDecorators: true
        })) headers: HeadersDto,
    ) {
        return `This action update property ${id} with data: ${body}`;
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return `This action returns a #${id} property`;
    }
}
