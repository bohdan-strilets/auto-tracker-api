import { Injectable } from '@nestjs/common';

import { DeviceType } from '@prisma/client';
import { Request } from 'express';
import * as geoip from 'geoip-lite';
import { UAParser } from 'ua-parser-js';

import { DeviceContext } from './types';

@Injectable()
export class DeviceService {
  extractFromRequest(req: Request): DeviceContext {
    const userAgent = req.headers['user-agent'] ?? '';
    const ipAddress = this.extractIp(req);
    const geo = geoip.lookup(ipAddress);

    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    return {
      deviceType: this.mapDeviceType(result.device.type),
      deviceName: result.device.model ?? null,
      deviceOS: result.os.name ?? null,
      deviceBrowser: result.browser.name ?? null,
      ipAddress,
      userAgent,
      country: geo?.country ?? null,
      city: geo?.city ?? null,
    };
  }

  private extractIp(req: Request): string {
    const forwarded = req.headers['x-forwarded-for'];

    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }

    return req.ip ?? '0.0.0.0';
  }

  private mapDeviceType(type: string | undefined): DeviceType {
    switch (type) {
      case 'mobile':
        return DeviceType.MOBILE;
      case 'tablet':
        return DeviceType.TABLET;
      default:
        return DeviceType.OTHER;
    }
  }
}
