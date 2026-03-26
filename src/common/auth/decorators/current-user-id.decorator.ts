import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

import { AccessTokenPayload } from '@modules/session/types';

export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as AccessTokenPayload;
    return user.sub;
  },
);
