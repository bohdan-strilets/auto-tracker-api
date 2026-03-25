import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorCode, ErrorDetail, ErrorResponse } from './error.types';

export class AppException extends HttpException {
  constructor(status: HttpStatus, code: ErrorCode, details: ErrorDetail[] | null = null) {
    const response: ErrorResponse = { statusCode: status, code, details };
    super(response, status);
  }
}
