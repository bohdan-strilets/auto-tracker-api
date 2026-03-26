import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

import { AccessTokenPayload } from '@modules/session/types';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AccessTokenPayload => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as AccessTokenPayload;
  },
);
