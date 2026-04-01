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
  create(@Param('vehicleId', ParseUUIDPipe) vehicleId: string, @Body() dto: CreateTireDto) {
    return this.tireService.create(vehicleId, dto);
  }

  @Get()
  @IsMember()
  @ApiOperation({ summary: 'List vehicle tires' })
  @ApiOkResponse({ type: [TireResponseDto] })
  @ApiGetTiresResponse()
  findAll(@Param('vehicleId', ParseUUIDPipe) vehicleId: string) {
    return this.tireService.findAll(vehicleId);
  }

  @Patch(':tireId')
  @IsAdmin()
  @ApiOperation({ summary: 'Update tire (Admin/Owner only)' })
  @ApiOkResponse({ type: TireResponseDto })
  @ApiUpdateTireResponse()
  update(
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Param('tireId', ParseUUIDPipe) tireId: string,
    @Body() dto: UpdateTireDto,
  ) {
    return this.tireService.update(tireId, vehicleId, dto);
  }

  @Delete(':tireId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsAdmin()
  @ApiOperation({ summary: 'Delete tire (Admin/Owner only)' })
  @ApiNoContentResponse({ description: 'Tire deleted' })
  @ApiDeleteTireResponse()
  async delete(
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Param('tireId', ParseUUIDPipe) tireId: string,
  ) {
    await this.tireService.delete(tireId, vehicleId);
  }
}
