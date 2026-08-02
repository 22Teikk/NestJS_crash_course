import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
