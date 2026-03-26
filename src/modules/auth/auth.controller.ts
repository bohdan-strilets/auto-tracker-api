import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';

import { CookieService } from '@common/cookie/cookie.service';
import { DeviceService } from '@common/device/device.service';

import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, ResendVerificationDto, VerifyEmailDto } from './dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly deviceService: DeviceService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const deviceContext = this.deviceService.extractFromRequest(req);
    const response = await this.authService.register(dto, deviceContext);
    const { accessToken, refreshToken, refreshTokenExpiresAt, user } = response;

    this.cookieService.setRefreshToken(res, refreshToken, refreshTokenExpiresAt);

    return { user, accessToken };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const deviceContext = this.deviceService.extractFromRequest(req);
    const response = await this.authService.login(dto, deviceContext);
    const { accessToken, refreshToken, refreshTokenExpiresAt, user } = response;

    this.cookieService.setRefreshToken(res, refreshToken, refreshTokenExpiresAt);

    return { user, accessToken };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    const refreshToken = this.cookieService.getRefreshToken(req);
    if (refreshToken) await this.authService.logout(refreshToken);
    this.cookieService.clearRefreshToken(res);
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendVerification(@Body() dto: ResendVerificationDto): Promise<void> {
    await this.authService.resendVerificationEmail(dto.email);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  async verifyEmail(@Body() dto: VerifyEmailDto): Promise<void> {
    await this.authService.verifyEmail(dto.token);
  }
}
