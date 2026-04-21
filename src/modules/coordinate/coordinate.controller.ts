import { Controller, Post, Body } from '@nestjs/common';

import { CoordinateService } from './coordinate.service';

import { CoordinateDto } from './dto/coordinate.dto';

@Controller('coordinate')
export class CoordinateController {
  constructor(private readonly coordinateService: CoordinateService) {}

  @Post()
  create(@Body() dto: CoordinateDto) {
    return this.coordinateService.sendCoordinateEmail(dto);
  }
}
