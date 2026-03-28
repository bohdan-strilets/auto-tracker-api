import { ERROR_CODES } from './error-codes';

export type ErrorCode =
  | (typeof ERROR_CODES.generic)[keyof typeof ERROR_CODES.generic]
  | (typeof ERROR_CODES.user)[keyof typeof ERROR_CODES.user]
  | (typeof ERROR_CODES.auth)[keyof typeof ERROR_CODES.auth]
  | (typeof ERROR_CODES.token)[keyof typeof ERROR_CODES.token]
  | (typeof ERROR_CODES.oauth)[keyof typeof ERROR_CODES.oauth]
  | (typeof ERROR_CODES.session)[keyof typeof ERROR_CODES.session]
  | (typeof ERROR_CODES.workspace)[keyof typeof ERROR_CODES.workspace];

export type ErrorDetail = {
  field: string;
  code: string;
};

export type ErrorResponse = {
  statusCode: number;
  code: ErrorCode;
  details: ErrorDetail[] | null;
};
