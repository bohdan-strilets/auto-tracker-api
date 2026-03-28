import { Workspace } from '@prisma/client';

export type CreateWorkspaceInput = {
  name: string;
  type?: Workspace['type'];
};
