import { applyDecorators } from '@nestjs/common';

import {
  ApiNotFoundResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from './base.responses';

export const ApiSessionsResponse = () =>
  applyDecorators(ApiUnauthorizedResponse(), ApiTooManyRequestsResponse());

export const ApiRevokeSessionResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiNotFoundResponse('SESSION_NOT_FOUND'),
    ApiTooManyRequestsResponse(),
  );
