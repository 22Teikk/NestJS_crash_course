import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const pgConfig = (): TypeOrmModuleOptions => ({
    url: process.env.DATABASE_URL,
    type: "postgres",
    autoLoadEntities: true,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
});