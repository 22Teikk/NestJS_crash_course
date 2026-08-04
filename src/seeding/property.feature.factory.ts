import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { PropertyFeature } from "../entities/property.feature.entity";

export const PropertyFeatureFactory = setSeederFactory(PropertyFeature, (faker: Faker) => {
    const propertyFeature = new PropertyFeature();
    propertyFeature.bedrooms = faker.number.int({ min: 1, max: 10 });
    propertyFeature.bathrooms = faker.number.int({ min: 1, max: 5 });
    propertyFeature.packingSpots = faker.number.int({ min: 0, max: 3 });
    propertyFeature.area = faker.number.int({ min: 100, max: 1000 });
    propertyFeature.hasBalcony = faker.datatype.boolean();
    propertyFeature.hasSwimmingPool = faker.datatype.boolean();
    return propertyFeature;
});