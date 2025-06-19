import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // ✅ Enable frontend-backend communication

  await app.listen(3000);
}
bootstrap();
