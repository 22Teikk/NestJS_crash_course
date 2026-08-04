import 'dotenv/config';
import { pgConfig } from "../../database/db.config";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { UserFactory } from "./user.factory";
import { PropertyFactory } from "./property.factory";
import { PropertyFeatureFactory } from "./property.feature.factory";
import { MainSeeder } from "./main.seeder";
import { User } from "../entities/user.entity";
import { Property } from "../entities/property.entity";
import { PropertyFeature } from "../entities/property.feature.entity";

const options: DataSourceOptions & SeederOptions = {
    ...(pgConfig() as any),
    type: "postgres",
    entities: [User, Property, PropertyFeature],
    factories: [UserFactory, PropertyFactory, PropertyFeatureFactory],
    seeds: [MainSeeder]
}


const datasource = new DataSource(options);
datasource.initialize().then(async () => {
    await datasource.synchronize(true);
    await runSeeders(datasource);
    console.log("Data Source initialized successfully");
    process.exit(0);
}).catch((error) => {
    console.log(error);
})