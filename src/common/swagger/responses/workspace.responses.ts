import { applyDecorators } from '@nestjs/common';

import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiValidationResponse,
} from './base.responses';

// ─── Workspace ───────────────────────────────────────────────────────────────

export const ApiCreateWorkspaceResponse = () =>
  applyDecorators(ApiValidationResponse(), ApiUnauthorizedResponse());

export const ApiGetWorkspaceResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('NOT_WORKSPACE_MEMBER'),
    ApiNotFoundResponse('WORKSPACE_NOT_FOUND'),
  );

export const ApiUpdateWorkspaceResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('WORKSPACE_NOT_FOUND'),
  );

export const ApiDeleteWorkspaceResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('WORKSPACE_NOT_FOUND'),
  );

// ─── Members ─────────────────────────────────────────────────────────────────

export const ApiGetMembersResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('NOT_WORKSPACE_MEMBER'),
    ApiNotFoundResponse('WORKSPACE_NOT_FOUND'),
  );

export const ApiUpdateMemberRoleResponse = () =>
  applyDecorators(
    ApiValidationResponse(),
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('WORKSPACE_MEMBER_NOT_FOUND'),
  );

export const ApiRemoveMemberResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiForbiddenResponse('INSUFFICIENT_PERMISSIONS'),
    ApiNotFoundResponse('WORKSPACE_MEMBER_NOT_FOUND'),
  );
