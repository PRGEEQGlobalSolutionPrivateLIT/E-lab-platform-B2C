import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(compression());

  const frontendUrl = (process.env.FRONTEND_URL ?? 'http://localhost:3000').replace(/\/+$/, '');

  const allowedOrigins = new Set([frontendUrl, 'http://localhost:3000', 'http://127.0.0.1:3000']);

  const localNetworkOrigin =
    /^http:\/\/(?:10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+):3000$/;

  app.enableCors({
    origin(origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
      if (!origin || allowedOrigins.has(origin) || localNetworkOrigin.test(origin)) {
        callback(null, true);
        return;
      }
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error(`Origin ${origin} is not allowed by CORS.`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api/v1');
  app.useBodyParser('json', { limit: '5mb' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = Number(process.env.PORT ?? 4000);

  await app.listen(port);

  console.log(`API running on port ${port}`);
  console.log(`API URL: http://localhost:${port}/api/v1`);
  console.log(`Allowed frontend: ${frontendUrl}`);
}

void bootstrap();