import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'database/db.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PropertyModule, TypeOrmModule.forRootAsync({ useFactory: () => pgConfig() }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
