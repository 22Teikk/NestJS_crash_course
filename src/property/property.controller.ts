import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import * as createPropertyZodDto from './dto/createPropertyZod.dto';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';
import * as updatePropertyDto from './dto/updateProperty.dto';

@ApiTags('properties')
@Controller('property')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) { }

    @Get()
    @ApiOperation({ summary: 'Get all properties' })
    @ApiResponse({ status: 200, description: 'Return all properties.' })
    findAll() {
        return this.propertyService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new property' })
    @ApiBody({ type: CreatePropertyDto })
    @ApiResponse({ status: 201, description: 'The property has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request / Validation Failed.' })
    @UsePipes(new ZodValidationPipe(createPropertyZodDto.createPropertySchema))
    create(@Body() body: createPropertyZodDto.CreatePropertyZodDto) {
        return this.propertyService.create(body);
    }


    @Patch(':id')
    @ApiOperation({ summary: 'Update a property by ID' })
    @ApiParam({ name: 'id', description: 'Property ID', example: 1 })
    @ApiHeader({ name: 'access-token', description: 'Access token' })
    @ApiHeader({ name: 'refresh-token', description: 'Refresh token' })
    @ApiResponse({ status: 200, description: 'The property has been successfully updated.' })
    @ApiResponse({ status: 400, description: 'Invalid property ID or request body.' })
    update(
        @Param("id", ParseIdPipe) id: number,
        @Body(
            new ZodValidationPipe(updatePropertyDto.updatePropertySchema)
        ) body: updatePropertyDto.UpdatePropertyDto,
        @RequestHeader(HeadersDto) headers: HeadersDto,
    ) {
        return this.propertyService.update(id, body, headers);
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get a property by ID' })
    @ApiParam({ name: 'id', description: 'Property ID', example: 1 })
    @ApiResponse({ status: 200, description: 'Return property details.' })
    @ApiResponse({ status: 404, description: 'Property not found.' })
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.propertyService.findOne(id);
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Delete a property by ID' })
    @ApiParam({ name: 'id', description: 'Property ID', example: 1 })
    @ApiResponse({ status: 200, description: 'The property has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Property not found.' })
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.delete(id);
    }
}

