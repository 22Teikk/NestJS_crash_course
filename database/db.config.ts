import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Property } from "src/entities/property.entity";

export const pgConfig = (): TypeOrmModuleOptions => ({
    url: process.env.DATABASE_URL,
    type: "postgres",
    autoLoadEntities: true,
    synchronize: true,
    entities: [__dirname + "/**/*.entity.ts"],
});