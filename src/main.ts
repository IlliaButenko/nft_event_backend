import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as expressBasicAuth from 'express-basic-auth';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './common/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const seedService = app.get(SeedService);
  if (process.env.PRODUCTION) {
    // production seed must be here
  } else {
    await seedService.startDevelopmentSeed();
  }

  const config = new DocumentBuilder()
    .setTitle('NFT Marketplace API Document')
    .setDescription('This document is for NFT Marketplace APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.use(
    '/doc',
    expressBasicAuth({
      challenge: true,
      users: {
        nft_market: 'password',
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
