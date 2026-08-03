import { Column, Entity, ForeignKey, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyFeature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bedrooms: number;

    @Column()
    bathrooms: number;

    @Column()
    packingSpots: number;

    @Column()
    area: number

    @Column()
    hasBalcony: boolean;

    @Column()
    hasSwimmingPool: boolean;

    // One to One relationship with Property Entity
    @OneToOne(() => Property, (property) => property.propertyFeature)
    // Add join column to the one side of the one to one relationship
    // That mean using id of Property to join (column name is propertyId) as foreign key in PropertyFeature table
    // In case you want to change the name of the column, you can use @JoinColumn({ name: "custom_column_name" })
    @JoinColumn()
    property: Property

}