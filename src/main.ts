import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validate every incoming request bodies and parameters
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      // Allow implicit conversion of types, e.g. string to number
      enableImplicitConversion: true
    }
  }));

  const config = new DocumentBuilder()
    .setTitle('Property Management API')
    .setDescription('API documentation for Property Service')
    .setVersion('1.0')
    .addTag('properties')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

