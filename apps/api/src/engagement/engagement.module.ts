import { Module } from '@nestjs/common';
import { EngagementController } from './engagement.controller';
import { EngagementService } from './engagement.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FeatureModulesModule } from '../feature-modules/feature-modules.module';

@Module({
  imports: [PrismaModule, FeatureModulesModule],
  controllers: [EngagementController],
  providers: [EngagementService],
})
export class EngagementModule {}
