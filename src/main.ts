import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { GlobalExceptionFilter } from '@common/exceptions/filter';

import { ConfigService } from '@config/config.service';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const port = config.port;
  const nodeEnv = config.nodeEnv;

  await app.listen(port);
  app.useGlobalFilters(new GlobalExceptionFilter());

  logger.verbose(`Server is running on port ${port} in ${nodeEnv} environment`);
}
void bootstrap();
