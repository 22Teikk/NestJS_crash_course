import { IsNumber, IsPositive, IsString, Length } from "class-validator";

export enum PropertyType {
    Create = 'create',
    Update = 'update'
}

export class CreatePropertyDto {
    @IsString()
    @Length(1, 10)
    name: string;
    @IsString()
    @Length(2, 10, { groups: [PropertyType.Create] })
    @Length(1, 10, { groups: [PropertyType.Update] })
    description: string;
    @IsNumber()
    @IsPositive({ message: "Area must be a positive number" })
    area: number;
}
