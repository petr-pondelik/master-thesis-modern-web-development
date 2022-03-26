import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable routes versioning
  app.enableVersioning();

  /** Activate validation pipe (e.g. for DTO validation).
   *  Remove non-whitelisted properties (properties without any validation decorator) from the received object. */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();
