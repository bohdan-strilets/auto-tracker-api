import { WorkspaceWithMembers } from './types';

export const mapWorkspaceToResponse = (workspace: WorkspaceWithMembers, userId: string) => {
  return {
    id: workspace.id,
    name: workspace.name,
    type: workspace.type,
    createdAt: workspace.createdAt,
    memberCount: workspace._count.workspaceMembers,
    vehicleCount: workspace._count.vehicles,
    currentUserRole: workspace.workspaceMembers.find((m) => m.userId === userId)?.role,
  };
};
