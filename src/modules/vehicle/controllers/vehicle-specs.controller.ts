import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { IsAdmin } from '@modules/workspace/decorators';

import { ApiUpdateVehicleSpecsResponse } from '@common/swagger';

import { UpdateVehicleSpecsDto, VehicleSpecsResponseDto } from '../dto';
import { VehicleService } from '../vehicle.service';

@ApiTags('Vehicles')
@ApiBearerAuth()
@Controller('workspaces/:workspaceId/vehicles')
export class VehicleSpecsController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Patch(':vehicleId/specs')
  @IsAdmin()
  @ApiOperation({ summary: 'Update vehicle specs (Admin/Owner only)' })
  @ApiOkResponse({ type: VehicleSpecsResponseDto })
  @ApiUpdateVehicleSpecsResponse()
  updateSpecs(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: UpdateVehicleSpecsDto,
  ) {
    return this.vehicleService.updateSpecs(vehicleId, workspaceId, dto);
  }
}
