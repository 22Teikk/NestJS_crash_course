import { Faker } from "@faker-js/faker";
import { Property } from "../../src/entities/property.entity";
import { setSeederFactory } from "typeorm-extension";

export const PropertyFactory = setSeederFactory(Property, (faker: Faker) => {
    const property = new Property();
    property.name = faker.location.streetAddress();
    property.description = faker.lorem.paragraph();
    property.price = faker.number.int({ min: 100000, max: 1000000 });
    property.area = faker.number.int({ min: 1, max: 1000 });
    return property;
});