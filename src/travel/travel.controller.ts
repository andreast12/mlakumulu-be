import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/dto/register-user.dto';

@Controller('travels')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post()
  @Roles(UserRole.EMPLOYEE)
  create(@Body() dto: CreateTravelDto) {
    return this.travelService.create(dto);
  }

  @Get()
  findAll(@Req() req) {
    return this.travelService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.EMPLOYEE)
  update(@Param('id') id: string, @Body() dto: UpdateTravelDto) {
    return this.travelService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.EMPLOYEE)
  remove(@Param('id') id: string) {
    return this.travelService.remove(id);
  }
}
