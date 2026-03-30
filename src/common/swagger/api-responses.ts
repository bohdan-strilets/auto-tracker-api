import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

// ─── Base responses ──────────────────────────────────────────────────────────

export const ApiValidationResponse = () =>
  ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Validation error',
    schema: {
      example: {
        statusCode: 422,
        code: 'VALIDATION_ERROR',
        details: [{ field: 'email', code: 'IS_EMAIL' }],
      },
    },
  });

export const ApiTooManyRequestsResponse = () =>
  ApiResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests',
    schema: {
      example: { statusCode: 429, code: 'TOO_MANY_REQUESTS', details: null },
    },
  });

export const ApiUnauthorizedResponse = () =>
  ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      example: { statusCode: 401, code: 'UNAUTHORIZED', details: null },
    },
  });

export const ApiConflictResponse = (code: string) =>
  ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
    schema: {
      example: { statusCode: 409, code, details: null },
    },
  });

export const ApiForbiddenResponse = (code: string) =>
  ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
    schema: {
      example: { statusCode: 403, code, details: null },
    },
  });

export const ApiNotFoundResponse = (code: string) =>
  ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    schema: {
      example: { statusCode: 404, code, details: null },
    },
  });

// ─── Composite decorators ────────────────────────────────────────────────────
// ─── Auth ────────────────────────────────────────────────────────────────────

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

// ─── Session ────────────────────────────────────────────────────────────────

export const ApiSessionsResponse = () =>
  applyDecorators(ApiUnauthorizedResponse(), ApiTooManyRequestsResponse());

export const ApiRevokeSessionResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse(),
    ApiNotFoundResponse('SESSION_NOT_FOUND'),
    ApiTooManyRequestsResponse(),
  );

// ─── Invite ──────────────────────────────────────────────────────────────────

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
