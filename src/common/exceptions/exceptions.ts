import { HttpStatus } from '@nestjs/common';

import { AppException } from './app-exception';
import { ERROR_CODES } from './error-codes';

// ─── User ────────────────────────────────────────────────────────────────────

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

// ─── Auth ────────────────────────────────────────────────────────────────────

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

// ─── Token ───────────────────────────────────────────────────────────────────

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

// ─── OAuth ───────────────────────────────────────────────────────────────────

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
