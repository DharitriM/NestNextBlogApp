import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: true, // Allow all origins
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enables automatic transformation
      whitelist: true, // Ensures only whitelisted properties are passed
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
