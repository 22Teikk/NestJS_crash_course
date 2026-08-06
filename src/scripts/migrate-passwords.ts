import 'dotenv/config';
import { DataSource } from 'typeorm';
import { pgConfig } from '../../database/db.config';
import { User } from '../entities/user.entity';
import { Property } from '../entities/property.entity';
import { PropertyFeature } from '../entities/property.feature.entity';
import * as bcrypt from 'bcrypt';

async function migrate() {
    const dataSource = new DataSource({
        ...(pgConfig() as any),
        type: 'postgres',
        entities: [User, Property, PropertyFeature],
    });

    await dataSource.initialize();
    console.log('Database connected.');

    const userRepo = dataSource.getRepository(User);
    const users = await userRepo.find();

    let count = 0;
    for (const user of users) {
        if (user.password && !user.password.startsWith('$2b$') && !user.password.startsWith('$2a$')) {
            user.password = bcrypt.hashSync(user.password, 10);
            await userRepo.save(user);
            count++;
        }
    }

    console.log(`Successfully hashed passwords for ${count} user(s).`);
    await dataSource.destroy();
}

migrate().catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
});
