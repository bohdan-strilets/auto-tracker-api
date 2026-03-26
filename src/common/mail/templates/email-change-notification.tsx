import { Hr, Text } from '@react-email/components';

import { EmailLayout } from '../components';
import { brand } from '../styles';
import { EmailChangeNotificationProps } from '../types';

export const EmailChangeNotificationTemplate = ({
  firstName,
  newEmail,
}: EmailChangeNotificationProps) => {
  return (
    <EmailLayout preview={`Your email address is being changed — ${brand.name}`}>
      <Text className="text-2xl font-bold mt-0 mb-2" style={{ color: brand.textPrimary }}>
        Email change requested ⚠️
      </Text>

      <Text className="text-base mt-0" style={{ color: brand.textSecondary }}>
        Hi <strong style={{ color: brand.textPrimary }}>{firstName}</strong>,
      </Text>

      <Text className="text-base mt-2" style={{ color: brand.textSecondary }}>
        A request was made to change your email address to{' '}
        <strong style={{ color: brand.primaryColor }}>{newEmail}</strong>.
      </Text>

      <Text
        className="text-sm px-4 py-3 rounded-lg mt-4"
        style={{
          color: '#92400e',
          backgroundColor: '#fffbeb',
          border: '1px solid #fcd34d',
        }}
      >
        ⚠️ If you did not make this request, please contact us immediately to secure your account.
      </Text>

      <Hr style={{ borderColor: brand.border, margin: '24px 0' }} />

      <Text className="text-sm m-0" style={{ color: brand.textMuted }}>
        If you need help, contact us at{' '}
        <a href="mailto:support@autotracker.app" style={{ color: brand.primaryColor }}>
          support@autotracker.app
        </a>
      </Text>
    </EmailLayout>
  );
};
