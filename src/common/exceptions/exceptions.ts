import { HttpStatus } from '@nestjs/common';

import { AppException } from './app-exception';
import { ERROR_CODES } from './error-codes';

// General

export class InternalServerErrorException extends AppException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, ERROR_CODES.generic.INTERNAL_SERVER_ERROR);
  }
}

export class ValidationErrorException extends AppException {
  constructor() {
    super(HttpStatus.BAD_REQUEST, ERROR_CODES.generic.VALIDATION_ERROR);
  }
}

// User
export class UserNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.user.USER_NOT_FOUND);
  }
}

export class EmailAlreadyExistsException extends AppException {
  constructor() {
    super(HttpStatus.CONFLICT, ERROR_CODES.user.EMAIL_ALREADY_EXISTS);
  }
}

// Auth
export class InvalidCredentialsException extends AppException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, ERROR_CODES.auth.INVALID_CREDENTIALS);
  }
}

export class AccountLockedException extends AppException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.auth.ACCOUNT_LOCKED);
  }
}

export class AccountSuspendedException extends AppException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.auth.ACCOUNT_SUSPENDED);
  }
}

export class EmailNotVerifiedException extends AppException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.auth.EMAIL_NOT_VERIFIED);
  }
}

export class PasswordResetRequiredException extends AppException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.auth.PASSWORD_RESET_REQUIRED);
  }
}

export class WeakPasswordException extends AppException {
  constructor() {
    super(HttpStatus.UNPROCESSABLE_ENTITY, ERROR_CODES.auth.WEAK_PASSWORD);
  }
}

// Token
export class TokenNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.token.TOKEN_NOT_FOUND);
  }
}

export class TokenExpiredException extends AppException {
  constructor() {
    super(HttpStatus.UNPROCESSABLE_ENTITY, ERROR_CODES.token.TOKEN_EXPIRED);
  }
}

export class TokenAlreadyUsedException extends AppException {
  constructor() {
    super(HttpStatus.UNPROCESSABLE_ENTITY, ERROR_CODES.token.TOKEN_ALREADY_USED);
  }
}

export class UnauthorizedException extends AppException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, ERROR_CODES.auth.UNAUTHORIZED);
  }
}

// OAuth
export class OAuthAccountNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.oauth.OAUTH_ACCOUNT_NOT_FOUND);
  }
}

export class OAuthAccountAlreadyLinkedException extends AppException {
  constructor() {
    super(HttpStatus.CONFLICT, ERROR_CODES.oauth.OAUTH_ACCOUNT_ALREADY_LINKED);
  }
}

// Session
export class SessionNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.session.SESSION_NOT_FOUND);
  }
}

export class SessionExpiredException extends AppException {
  constructor() {
    super(HttpStatus.UNPROCESSABLE_ENTITY, ERROR_CODES.session.SESSION_EXPIRED);
  }
}

export class SessionInvalidException extends AppException {
  constructor() {
    super(HttpStatus.UNPROCESSABLE_ENTITY, ERROR_CODES.session.SESSION_INVALID);
  }
}

// Workspace
export class WorkspaceNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.workspace.WORKSPACE_NOT_FOUND);
  }
}

export class WorkspaceMemberNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.workspace.WORKSPACE_MEMBER_NOT_FOUND);
  }
}

export class NotWorkspaceMemberException extends AppException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.workspace.NOT_WORKSPACE_MEMBER);
  }
}

export class InsufficientPermissionsException extends AppException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.workspace.INSUFFICIENT_PERMISSIONS);
  }
}

export class SoleOwnerException extends AppException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.workspace.SOLE_OWNER);
  }
}

export class AdminCannotAssignOwnerException extends AppException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.workspace.ADMIN_CANNOT_ASSIGN_OWNER);
  }
}

export class AdminCannotRemovePrivilegedException extends AppException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.workspace.ADMIN_CANNOT_REMOVE_PRIVILEGED);
  }
}

export class WorkspaceMemberAlreadyExistsException extends AppException {
  constructor() {
    super(HttpStatus.CONFLICT, ERROR_CODES.workspace.WORKSPACE_MEMBER_ALREADY_EXISTS);
  }
}

// Invite
export class InviteNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.invite.INVITE_NOT_FOUND);
  }
}
export class InviteAlreadyExistsException extends AppException {
  constructor() {
    super(HttpStatus.CONFLICT, ERROR_CODES.invite.INVITE_ALREADY_EXISTS);
  }
}
export class InviteExpiredException extends AppException {
  constructor() {
    super(HttpStatus.UNPROCESSABLE_ENTITY, ERROR_CODES.invite.INVITE_EXPIRED);
  }
}

// Vehicle
export class VehicleNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.vehicle.VEHICLE_NOT_FOUND);
  }
}

// Media
export class MediaNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.media.MEDIA_NOT_FOUND);
  }
}
export class MediaOwnershipException extends AppException {
  constructor() {
    super(HttpStatus.FORBIDDEN, ERROR_CODES.media.MEDIA_OWNERSHIP);
  }
}
export class InvalidFileTypeException extends AppException {
  constructor() {
    super(HttpStatus.UNPROCESSABLE_ENTITY, ERROR_CODES.media.INVALID_FILE_TYPE);
  }
}
export class FileTooLargeException extends AppException {
  constructor() {
    super(HttpStatus.UNPROCESSABLE_ENTITY, ERROR_CODES.media.FILE_TOO_LARGE);
  }
}

// Timeline
export class TimelineEventNotFoundException extends AppException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ERROR_CODES.timeline.TIMELINE_EVENT_NOT_FOUND);
  }
}
