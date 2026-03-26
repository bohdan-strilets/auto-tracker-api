import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AccessTokenPayload } from '@modules/session/types';

import { UnauthorizedException } from '@common/exceptions';

import { ConfigService } from '@config/config.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtAccessSecret,
    });
  }

  validate(payload: AccessTokenPayload): AccessTokenPayload {
    if (!payload.sub || !payload.sid || !payload.email) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
