import { Body, Controller, Get, Headers, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import * as createPropertyZodDto from './dto/createPropertyZod.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) { }

    @Get()
    findAll() {
        return this.propertyService.findAll();
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createPropertyZodDto.createPropertySchema))
    create(@Body() body: createPropertyZodDto.CreatePropertyZodDto) {
        return this.propertyService.create(body);
    }

    @Patch(':id')
    update(
        @Param("id", ParseIdPipe) id: number,
        @Body() body: CreatePropertyDto,
        @RequestHeader(new ValidationPipe({
            whitelist: true,
            validateCustomDecorators: true
        })) headers: HeadersDto,
    ) {
        return this.propertyService.update(id, body, headers);
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.propertyService.findOne(id);
    }
}
