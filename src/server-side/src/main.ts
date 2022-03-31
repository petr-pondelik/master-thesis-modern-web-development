import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Master Thesis REST API')
    .setDescription('Master Thesis REST API description.')
    .setVersion('1.0')
    .addTag('API Root')
    .addTag('Users')
    .addTag('Authentication')
    .addTag('Stories')
    .addTag('Subscriptions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('open-api', app, document);

  app.enableCors({
    allowedHeaders: '*',
    methods: '*',
    origin: '*'
  })

  await app.listen(3000);
}

bootstrap();
