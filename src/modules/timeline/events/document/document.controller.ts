import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IsAdmin } from '@common/auth/decorators';
import { ApiCreateTimelineEventResponse } from '@common/swagger';

import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentEventResponseDto } from './dto/document-event-response.dto';

@ApiTags('Timeline')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/timeline')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('document')
  @IsAdmin()
  @ApiOperation({
    summary: 'Add document',
    description:
      'Creates a document event. Types: INSURANCE_OC, INSURANCE_AC, TECHNICAL_INSPECTION, LOAN, LEASING, FINE, OTHER. After creating, upload file via POST /media/upload with entityType=DOCUMENT_FILE and entityId=eventId.',
  })
  @ApiOkResponse({ type: DocumentEventResponseDto })
  @ApiCreateTimelineEventResponse()
  create(@Param('vehicleId', ParseUUIDPipe) vehicleId: string, @Body() dto: CreateDocumentDto) {
    return this.documentService.create(vehicleId, dto);
  }
}
