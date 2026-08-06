import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePropertyDto } from "./dto/createProperty.dto";
import { HeadersDto } from "./dto/headers.dto";
import { Repository } from "typeorm";
import { Property } from "src/entities/property.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdatePropertyDto } from "./dto/updateProperty.dto";
import { PaginationDto } from "./dto/pagination.dto";

@Injectable()
export class PropertyService {
    constructor(
        @InjectRepository(Property) private readonly propertyRepsitory: Repository<Property>) { }

    findAll(paginationDto: PaginationDto) {
        return this.propertyRepsitory.find({
            skip: paginationDto.skip,
            take: paginationDto.limit
        });
    }

    create(body: CreatePropertyDto) {
        // Using save because create() make entity object in memory only, must call save() after that so using save() is quickly
        // Using save because it response full entity, insert will return InsertResult object
        return this.propertyRepsitory.save(body);
    }

    async findOne(id: number) {
        const property = await this.propertyRepsitory.findOne({
            where: {
                id: id
            }
        })

        if (!property) {
            throw new NotFoundException(`Property with id ${id} not found`);
        }
        return property;
    }

    async update(id: number, body: UpdatePropertyDto, headers: HeadersDto) {
        const updateResult = await this.propertyRepsitory.update(id, body);
        if (updateResult.affected === 0) {
            throw new NotFoundException(`Property with id ${id} not found`);
        }
        return updateResult;
    }

    async delete(id: number) {
        const deleteResult = await this.propertyRepsitory.delete({ id: id });
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`Property with id ${id} not found`);
        }
        return deleteResult;
    }
}