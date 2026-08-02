import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';
import { PropertyService } from './property.service';

@Module({
  controllers: [PropertyController],
  // Use validation pipe globally for this controller
  providers: [
    // {
    //   provide: APP_PIPE, useValue: new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //   })
    // }
    PropertyService
  ]
})
export class PropertyModule { }
