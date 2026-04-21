import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { CoordinateController } from './coordinate.controller';
import { CoordinateService } from './coordinate.service';

@Module({
  controllers: [CoordinateController],
  providers: [CoordinateService],
  imports: [SharedModule],
})
export class CoordinateModule {}
