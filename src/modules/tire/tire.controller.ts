import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { IsAdmin, IsMember } from '@common/auth/decorators';
import {
  ApiCreateTireResponse,
  ApiDeleteTireResponse,
  ApiGetTiresResponse,
  ApiUpdateTireResponse,
} from '@common/swagger';

import { CreateTireDto, TireResponseDto, UpdateTireDto } from './dto';
import { TireService } from './tire.service';

@ApiTags('Tires')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles/:vehicleId/tires')
export class TireController {
  constructor(private readonly tireService: TireService) {}

  @Post()
  @IsAdmin()
  @ApiOperation({ summary: 'Add tire to vehicle (Admin/Owner only)' })
  @ApiOkResponse({ type: TireResponseDto })
  @ApiCreateTireResponse()
  create(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: CreateTireDto,
  ) {
    return this.tireService.create(vehicleId, workspaceId, dto);
  }

  @Get()
  @IsMember()
  @ApiOperation({ summary: 'List vehicle tires' })
  @ApiOkResponse({ type: [TireResponseDto] })
  @ApiGetTiresResponse()
  findAll(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
  ) {
    return this.tireService.findAll(vehicleId, workspaceId);
  }

  @Patch(':tireId')
  @IsAdmin()
  @ApiOperation({ summary: 'Update tire (Admin/Owner only)' })
  @ApiOkResponse({ type: TireResponseDto })
  @ApiUpdateTireResponse()
  update(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Param('tireId', ParseUUIDPipe) tireId: string,
    @Body() dto: UpdateTireDto,
  ) {
    return this.tireService.update(tireId, vehicleId, workspaceId, dto);
  }

  @Delete(':tireId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsAdmin()
  @ApiOperation({ summary: 'Delete tire (Admin/Owner only)' })
  @ApiNoContentResponse({ description: 'Tire deleted' })
  @ApiDeleteTireResponse()
  async delete(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Param('tireId', ParseUUIDPipe) tireId: string,
  ) {
    await this.tireService.delete(tireId, vehicleId, workspaceId);
  }
}
