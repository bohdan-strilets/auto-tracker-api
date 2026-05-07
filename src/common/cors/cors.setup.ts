import { INestApplication } from '@nestjs/common';

import { ConfigService } from '@config/config.service';

export const corsSetup = (app: INestApplication, config: ConfigService): void => {
  const origins = [config.frontendUrl, config.frontendUrlLocal];
  const filteredOrigins = origins.filter((url): url is string => Boolean(url));

  app.enableCors({
    origin: filteredOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
};
