import { EntityType } from '@prisma/client';

export const ENTITY_TYPE_SUBFOLDERS: Record<EntityType, string> = {
  [EntityType.USER_AVATAR]: 'avatars',
  [EntityType.USER_COVER]: 'covers',
  [EntityType.CAR_GALLERY]: 'gallery',
  [EntityType.DOCUMENT_FILE]: 'documents',
  [EntityType.RECEIPT_IMAGE]: 'receipts',
};
