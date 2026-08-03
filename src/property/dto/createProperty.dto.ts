import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString, Length } from "class-validator";

export enum PropertyType {
    Create = 'create',
    Update = 'update'
}

export class CreatePropertyDto {
    @ApiProperty({ description: 'The name of the property', example: 'Villa' })
    @IsString()
    @Length(1, 10)
    name: string;

    @ApiProperty({ description: 'Description of the property', example: 'Nice house' })
    @IsString()
    @Length(2, 10, { groups: [PropertyType.Create] })
    @Length(1, 10, { groups: [PropertyType.Update] })
    description: string;

    @ApiProperty({ description: 'Property area in square meters', example: 120 })
    @IsNumber()
    @IsPositive({ message: "Area must be a positive number" })
    area: number;

    @ApiPropertyOptional({ description: 'Property price', example: 1000, default: 0 })
    @IsOptional()
    @IsNumber()
    @IsPositive({ message: "Price must be a positive number" })
    price?: number = 0;
}


