import { Workspace, WorkspaceMember } from '@prisma/client';

type WorkspaceMemberUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type WorkspaceMemberWithUser = WorkspaceMember & {
  user: WorkspaceMemberUser;
};

export type WorkspaceWithMembers = Workspace & {
  workspaceMembers: WorkspaceMemberWithUser[];
  _count: {
    workspaceMembers: number;
    vehicles: number;
  };
};
