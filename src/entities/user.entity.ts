import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";
import { property } from "zod";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    avatarUrl: string

    // this column will be set automatically when the entity is created, if want to set in update (UpdateDateColumn) 
    @CreateDateColumn()
    createAt: Date

    // One to Many relationship with Property Entity
    // That mean one user can have many properties
    @OneToMany(() => Property, (property) => property.user)
    properties: Property[]

    // Many to Many relationship with Property Entity 
    // That mean one user can like many properties
    // and one property can be liked by many users
    @ManyToMany(() => Property, (property) => property.likedBy)
    @JoinTable({ name: "user_property_likeds" })
    likedProperties: Property[]
}