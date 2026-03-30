import { Hr, Link, Section, Text } from '@react-email/components';

import { EmailLayout } from '../components';
import { brand } from '../styles';

interface WorkspaceInviteTemplateProps {
  workspaceName: string;
  invitedByName: string;
  role: string;
  acceptUrl: string;
  rejectUrl: string;
}

export const WorkspaceInviteTemplate = ({
  workspaceName,
  invitedByName,
  role,
  acceptUrl,
  rejectUrl,
}: WorkspaceInviteTemplateProps) => {
  return (
    <EmailLayout preview={`You've been invited to ${workspaceName} — ${brand.name}`}>
      <Text className="text-2xl font-bold mt-0 mb-2" style={{ color: brand.textPrimary }}>
        Workspace invitation 🚗
      </Text>

      <Text className="text-base mt-0" style={{ color: brand.textSecondary }}>
        <strong style={{ color: brand.textPrimary }}>{invitedByName}</strong> invited you to join{' '}
        <strong style={{ color: brand.textPrimary }}>{workspaceName}</strong> as{' '}
        <strong style={{ color: brand.primaryColor }}>{role}</strong>.
      </Text>

      <Section className="mt-6">
        <Link
          href={acceptUrl}
          className="text-sm font-semibold px-6 py-3 rounded-lg"
          style={{
            backgroundColor: brand.primaryColor,
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          Accept invitation
        </Link>
      </Section>

      <Text className="text-sm mt-6" style={{ color: brand.textMuted }}>
        Don't want to join?{' '}
        <Link href={rejectUrl} style={{ color: brand.primaryColor }}>
          Decline invitation
        </Link>
      </Text>

      <Hr style={{ borderColor: brand.border, margin: '24px 0' }} />

      <Text className="text-sm m-0" style={{ color: brand.textMuted }}>
        This invitation expires in 7 days.
      </Text>
    </EmailLayout>
  );
};
