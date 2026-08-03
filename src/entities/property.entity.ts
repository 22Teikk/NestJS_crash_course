import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeature } from "./property.feature.entity";
import { User } from "./user.entity";

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    area: number;

    @Column({ default: 0 })
    price: number;

    // One to One relationship with PropertyFeature Entity
    @OneToOne(() => PropertyFeature, (propertyFeature) => propertyFeature.property,
        // cascade: true mean if you update property, it will update propertyFeature automatically
        // cascade: ["remove"] mean if you delete property, it will delete propertyFeature automatically
        // cascade: ["insert", "update", "remove"] mean if you insert, update or delete property, it will insert, update or delete propertyFeature automatically
        // cascade: [] mean if you update property, it will not update propertyFeature automatically (this is default) like a false
        { cascade: true }
    )
    propertyFeature: PropertyFeature;

    // One to Many relationship with User Entity
    // That mean one user can have many properties
    @ManyToOne(() => User, (user) => user.properties)
    // Change default column name of foreign key from userId to owner_id
    @JoinColumn({ name: "owner_id" })
    user: User;
}