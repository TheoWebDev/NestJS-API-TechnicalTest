// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurer CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Remplacez par le domaine de votre front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Auth', 'email'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
