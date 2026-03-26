import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

import { Response } from 'express';

import { ERROR_CODES } from './error-codes';
import { ErrorResponse } from './error.types';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ThrottlerException) {
      const body: ErrorResponse = {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        code: ERROR_CODES.generic.TOO_MANY_REQUESTS,
        details: null,
      };
      response.status(HttpStatus.TOO_MANY_REQUESTS).json(body);
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse() as ErrorResponse;
      response.status(status).json(body);
      return;
    }

    this.logger.error(
      exception instanceof Error ? exception.message : 'Unknown error',
      exception instanceof Error ? exception.stack : undefined,
    );

    const body: ErrorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ERROR_CODES.generic.INTERNAL_SERVER_ERROR,
      details: null,
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
  }
}
