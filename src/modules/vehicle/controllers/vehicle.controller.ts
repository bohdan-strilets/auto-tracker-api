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
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

import { IsAdmin, IsMember } from '@modules/workspace/decorators';

import {
  ApiCreateVehicleResponse,
  ApiDeleteVehicleResponse,
  ApiGetVehicleResponse,
  ApiGetVehiclesResponse,
  ApiUpdateVehicleResponse,
} from '@common/swagger';

import {
  CreateVehicleDto,
  UpdateVehicleDto,
  VehicleListResponseDto,
  VehicleQueryDto,
  VehicleResponseDto,
} from '../dto';
import { VehicleService } from '../vehicle.service';

@ApiTags('Vehicles')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @IsAdmin()
  @ApiOperation({ summary: 'Create vehicle (Admin/Owner only)' })
  @ApiOkResponse({ type: VehicleResponseDto })
  @ApiCreateVehicleResponse()
  create(@Param('workspaceId', ParseUUIDPipe) workspaceId: string, @Body() dto: CreateVehicleDto) {
    return this.vehicleService.create(workspaceId, dto);
  }

  @Get()
  @IsMember()
  @ApiOperation({ summary: 'List workspace vehicles' })
  @ApiOkResponse({ type: VehicleListResponseDto })
  @ApiGetVehiclesResponse()
  findAll(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Query() query: VehicleQueryDto,
  ) {
    return this.vehicleService.findAll(workspaceId, query);
  }

  @Get(':vehicleId')
  @IsMember()
  @ApiOperation({ summary: 'Get vehicle by ID' })
  @ApiOkResponse({ type: VehicleResponseDto })
  @ApiGetVehicleResponse()
  findOne(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
  ) {
    return this.vehicleService.getOne(vehicleId, workspaceId);
  }

  @Patch(':vehicleId')
  @IsAdmin()
  @ApiOperation({ summary: 'Update vehicle (Admin/Owner only)' })
  @ApiOkResponse({ type: VehicleResponseDto })
  @ApiUpdateVehicleResponse()
  update(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: UpdateVehicleDto,
  ) {
    return this.vehicleService.update(vehicleId, workspaceId, dto);
  }

  @Delete(':vehicleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @IsAdmin()
  @ApiOperation({ summary: 'Delete vehicle (Admin/Owner only)' })
  @ApiNoContentResponse({ description: 'Vehicle deleted' })
  @ApiDeleteVehicleResponse()
  async delete(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
  ) {
    await this.vehicleService.delete(vehicleId, workspaceId);
  }
}
