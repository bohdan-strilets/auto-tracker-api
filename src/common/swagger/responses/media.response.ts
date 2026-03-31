import { applyDecorators } from '@nestjs/common';

import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableResponse,
} from './base.responses';

export const ApiUploadMediaResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiUnprocessableResponse('INVALID_FILE_TYPE'),
    ApiUnprocessableResponse('FILE_TOO_LARGE'),
  );

export const ApiGetMediaResponse = () =>
  applyDecorators(ApiUnauthorizedResponse(), ApiNotFoundResponse('MEDIA_NOT_FOUND'));

export const ApiDeleteMediaResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('MEDIA_OWNERSHIP'),
    ApiNotFoundResponse('MEDIA_NOT_FOUND'),
  );
