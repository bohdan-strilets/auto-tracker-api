import { Injectable, Logger } from '@nestjs/common';

import { render } from '@react-email/components';
import { Resend } from 'resend';

import { ConfigService } from '@config/config.service';

import {
  AccountLockedTemplate,
  EmailChangeNotificationTemplate,
  EmailChangeTemplate,
  PasswordChangedTemplate,
  ResetPasswordTemplate,
  VerifyEmailTemplate,
  WelcomeTemplate,
} from './templates';

@Injectable()
export class MailService {
  private readonly resend: Resend;
  private readonly logger = new Logger(MailService.name);
  private readonly fromEmail: string;
  private readonly appUrl: string;

  constructor(private readonly config: ConfigService) {
    this.resend = new Resend(this.config.resendApiKey);
    this.fromEmail = this.config.mailFromEmail;
    this.appUrl = this.config.appUrl;
  }

  async sendVerificationEmail(to: string, firstName: string, rawToken: string): Promise<void> {
    const verificationUrl = `${this.appUrl}/auth/verify-email?token=${rawToken}`;

    const html = await render(
      VerifyEmailTemplate({
        firstName,
        verificationUrl,
      }),
    );

    await this.send(to, 'Verify your email', html);
  }

  async sendPasswordResetEmail(to: string, firstName: string, rawToken: string): Promise<void> {
    const resetUrl = `${this.appUrl}/auth/reset-password?token=${rawToken}`;
    const html = await render(ResetPasswordTemplate({ firstName, resetUrl }));

    await this.send(to, 'Reset your password', html);
  }

  async sendEmailChangeEmail(
    to: string,
    firstName: string,
    newEmail: string,
    rawToken: string,
  ): Promise<void> {
    const confirmUrl = `${this.appUrl}/auth/confirm-email-change?token=${rawToken}`;

    const html = await render(
      EmailChangeTemplate({
        firstName,
        newEmail,
        confirmUrl,
      }),
    );

    await this.send(to, 'Confirm your new email', html);
  }

  async sendWelcomeEmail(to: string, firstName: string): Promise<void> {
    const html = await render(
      WelcomeTemplate({
        firstName,
        appUrl: this.appUrl,
      }),
    );

    await this.send(to, `Welcome to AutoTracker, ${firstName}!`, html);
  }

  async sendPasswordChangedEmail(to: string, firstName: string, changedAt: string): Promise<void> {
    const resetUrl = `${this.appUrl}/auth/reset-password`;

    const html = await render(
      PasswordChangedTemplate({
        firstName,
        changedAt,
        resetUrl,
      }),
    );

    await this.send(to, 'Your password was changed', html);
  }

  async sendAccountLockedEmail(to: string, firstName: string, lockedUntil: string): Promise<void> {
    const resetUrl = `${this.appUrl}/auth/reset-password`;

    const html = await render(
      AccountLockedTemplate({
        firstName,
        lockedUntil,
        resetUrl,
      }),
    );

    await this.send(to, 'Your account has been locked', html);
  }

  async sendEmailChangeNotification(
    to: string,
    firstName: string,
    newEmail: string,
  ): Promise<void> {
    const html = await render(EmailChangeNotificationTemplate({ firstName, newEmail }));
    await this.send(to, 'Your email address is being changed', html);
  }

  // Helper methods

  private async send(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject,
        html,
      });
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
      throw error;
    }
  }
}
