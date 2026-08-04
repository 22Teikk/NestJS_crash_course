import { User } from "../../src/entities/user.entity";
import { Property } from "../../src/entities/property.entity";
import { PropertyFeature } from "../../src/entities/property.feature.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { faker } from "@faker-js/faker";

export class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userRepo = dataSource.getRepository(User);
        const userFactory = factoryManager.get(User);
        const users = await userFactory.saveMany(10);

        console.log("Seeding Users...")
        await userRepo.save(users);

        const propertyFactory = factoryManager.get(Property)
        const propertyFeatureFactory = factoryManager.get(PropertyFeature)
        const properties = await Promise.all(
            Array.from({ length: 50 }).map(async () => {
                const property = await propertyFactory.make({
                    user: faker.helpers.arrayElement(users),
                    propertyFeature: await propertyFeatureFactory.save()
                })
                return property;
            })
        )
        console.log("Seeding properties...")
        const propertyRepo = dataSource.getRepository(Property);
        await propertyRepo.save(properties);
    }
}