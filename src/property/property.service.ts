import { Injectable } from "@nestjs/common";
import { CreatePropertyDto } from "./dto/createProperty.dto";
import { HeadersDto } from "./dto/headers.dto";

@Injectable()
export class PropertyService {
    findAll() { }

    create(body: CreatePropertyDto) {

    }

    findOne(id: number) {

    }

    update(id: number, body: CreatePropertyDto, headers: HeadersDto) { }
}