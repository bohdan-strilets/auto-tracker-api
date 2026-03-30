import { applyDecorators } from '@nestjs/common';

import {
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from './base.responses';

export const ApiSendInviteResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiConflictResponse('INVITE_ALREADY_EXISTS'),
  );

export const ApiGetInvitesResponse = () =>
  applyDecorators(ApiUnauthorizedResponse(), ApiForbiddenResponse('NOT_WORKSPACE_MEMBER'));

export const ApiCancelInviteResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('INVITE_NOT_FOUND'),
  );

export const ApiAcceptInviteResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiNotFoundResponse('INVITE_NOT_FOUND'),
    ApiConflictResponse('WORKSPACE_MEMBER_ALREADY_EXISTS'),
  );

export const ApiRejectInviteResponse = () =>
  applyDecorators(ApiNotFoundResponse('INVITE_NOT_FOUND'));
