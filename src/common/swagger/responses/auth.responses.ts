import { applyDecorators } from '@nestjs/common';

import {
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from './base.responses';

export const ApiLogoutResponse = () => applyDecorators(ApiTooManyRequestsResponse());

export const ApiRegisterResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiConflictResponse('EMAIL_ALREADY_EXISTS'),
    ApiTooManyRequestsResponse(),
  );

export const ApiLoginResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('ACCOUNT_LOCKED'),
    ApiTooManyRequestsResponse(),
  );

export const ApiRefreshResponse = () =>
  applyDecorators(ApiUnauthorizedResponse(), ApiTooManyRequestsResponse());

export const ApiResendVerificationResponse = () =>
  applyDecorators(ApiValidationResponse(), ApiTooManyRequestsResponse());

export const ApiVerifyEmailResponse = () =>
  applyDecorators(
    ApiNotFoundResponse('TOKEN_NOT_FOUND'),
    ApiValidationResponse(),
    ApiTooManyRequestsResponse(),
  );

export const ApiForgotPasswordResponse = () =>
  applyDecorators(ApiValidationResponse(), ApiTooManyRequestsResponse());

export const ApiResetPasswordResponse = () =>
  applyDecorators(
    ApiNotFoundResponse('TOKEN_NOT_FOUND'),
    ApiValidationResponse(),
    ApiTooManyRequestsResponse(),
  );

export const ApiChangePasswordResponse = () =>
  applyDecorators(ApiUnauthorizedResponse(), ApiValidationResponse(), ApiTooManyRequestsResponse());

export const ApiChangeEmailResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiConflictResponse('EMAIL_ALREADY_EXISTS'),
    ApiValidationResponse(),
    ApiTooManyRequestsResponse(),
  );

export const ApiConfirmEmailChangeResponse = () =>
  applyDecorators(
    ApiNotFoundResponse('TOKEN_NOT_FOUND'),
    ApiValidationResponse(),
    ApiTooManyRequestsResponse(),
  );
