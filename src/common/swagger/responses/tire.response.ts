import { applyDecorators } from '@nestjs/common';

import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from './base.responses';

export const ApiCreateTireResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('VEHICLE_NOT_FOUND'),
  );

export const ApiGetTiresResponse = () =>
  applyDecorators(ApiUnauthorizedResponse(), ApiForbiddenResponse('NOT_WORKSPACE_MEMBER'));

export const ApiUpdateTireResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('TIRE_NOT_FOUND'),
  );

export const ApiDeleteTireResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('TIRE_NOT_FOUND'),
  );

export const ApiRemoveTireResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('TIRE_CHANGE_NOT_FOUND'),
  );
