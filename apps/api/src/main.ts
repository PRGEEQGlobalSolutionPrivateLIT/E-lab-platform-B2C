import {
  NestFactory,
} from '@nestjs/core';

import {
  AppModule,
} from './app.module.js';

/* =========================================================
   BOOTSTRAP
========================================================= */

async function bootstrap() {
  const app =
    await NestFactory.create(
      AppModule,
    );

  /* =======================================================
     FRONTEND URL

     Local:
     http://localhost:3000

     Production:
     Set FRONTEND_URL in environment variables.
  ======================================================= */

  const frontendUrl =
    (
      process.env.FRONTEND_URL ??
      'http://localhost:3000'
    ).replace(
      /\/+$/,
      '',
    );

  /* =======================================================
     ALLOWED FRONTEND ORIGINS
  ======================================================= */

  const allowedOrigins =
    new Set([
      frontendUrl,

      'http://localhost:3000',

      'http://127.0.0.1:3000',
    ]);

  /* =======================================================
     CORS
  ======================================================= */

  app.enableCors({
    origin(
      origin:
        string | undefined,

      callback: (
        error:
          Error | null,

        allow?:
          boolean,
      ) => void,
    ) {
      /*
       * Requests without Origin are allowed.
       *
       * Examples:
       * - PowerShell
       * - Postman
       * - server-to-server
       */

      if (
        !origin
      ) {
        callback(
          null,
          true,
        );

        return;
      }

      /* ===================================================
         EXPLICITLY ALLOWED FRONTENDS
      =================================================== */

      if (
        allowedOrigins.has(
          origin,
        )
      ) {
        callback(
          null,
          true,
        );

        return;
      }

      /* ===================================================
         LOCAL / PRIVATE NETWORK DEVELOPMENT

         Examples:

         http://10.0.0.15:3000

         http://192.168.1.25:3000

         http://172.21.160.1:3000
      =================================================== */

      const isLocalNetworkOrigin =
        /^http:\/\/(?:10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+):3000$/.test(
          origin,
        );

      if (
        isLocalNetworkOrigin
      ) {
        callback(
          null,
          true,
        );

        return;
      }

      console.warn(
        `CORS blocked origin: ${origin}`,
      );

      callback(
        new Error(
          `Origin ${origin} is not allowed by CORS.`,
        ),

        false,
      );
    },

    credentials:
      true,

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  });

  /* =======================================================
     GLOBAL API PREFIX
  ======================================================= */

  app.setGlobalPrefix(
    'api/v1',
  );

  /* =======================================================
     PORT
  ======================================================= */

  const port =
    Number(
      process.env.PORT ??
      4000,
    );

  /* =======================================================
     START SERVER

     0.0.0.0 allows:
     - localhost
     - LAN development
     - Docker/container access
     - deployment access
  ======================================================= */

  await app.listen(
    port,
    '0.0.0.0',
  );

  /* =======================================================
     STARTUP LOG
  ======================================================= */

  console.log(
    `API running on port ${port}`,
  );

  console.log(
    `API URL: http://localhost:${port}/api/v1`,
  );

  console.log(
    `Allowed deployed frontend: ${frontendUrl}`,
  );

  console.log(
    'Local frontend allowed: http://localhost:3000',
  );

  console.log(
    'Local frontend allowed: http://127.0.0.1:3000',
  );
}

void bootstrap();