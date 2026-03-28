import { UseGuards } from '@nestjs/common';

import { WorkspaceMemberGuard } from '../guards';

export const IsMember = () => UseGuards(WorkspaceMemberGuard);
