import { HttpStatus, ValidationPipe } from '@nestjs/common';

import { AppException } from '@common/exceptions/app-exception';
import { ERROR_CODES } from '@common/exceptions/error-codes';

export function createValidationPipe(): ValidationPipe {
  return new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const details = errors.map((error) => ({
        field: error.property,
        code: Object.keys(error.constraints ?? {})[0].toUpperCase(),
      }));

      return new AppException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        ERROR_CODES.generic.VALIDATION_ERROR,
        details,
      );
    },
  });
}
