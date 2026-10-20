import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { LabChecksService } from '../labs/lab-checks.service.js';
import { LabOwnersService } from '../labs/lab-owners.service.js';
import { PowerBILabController } from './power-bi-lab.controller.js';
import { PowerBILabService } from './power-bi-lab.service.js';
import { PowerBIValidatorService } from './validation/power-bi-validator.service.js';

@Module({
  imports: [AuthModule],
  controllers: [PowerBILabController],
  providers: [PowerBILabService, PowerBIValidatorService, LabOwnersService, LabChecksService],
  exports: [PowerBILabService, PowerBIValidatorService],
})
export class PowerBILabModule {}