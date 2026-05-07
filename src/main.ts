import { Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { JwtAuthGuard } from '@common/auth/guards';
import { corsSetup } from '@common/cors/cors.setup';
import { GlobalExceptionFilter } from '@common/exceptions/filter';
import { createValidationPipe } from '@common/pipes';
import { setupSwagger } from '@common/swagger';

import { ConfigService } from '@config/config.service';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const port = config.port;
  const host = config.host;

  const nodeEnv = config.nodeEnv;
  const isProduction = config.isProduction;

  const reflector = app.get(Reflector);

  corsSetup(app, config);

  if (!isProduction) {
    setupSwagger(app);
  }

  app.use(helmet());

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(createValidationPipe());
  app.use(cookieParser());

  app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(port, host);

  logger.verbose(`Server is running on ${host}:${port} in ${nodeEnv} environment`);
}
void bootstrap();
