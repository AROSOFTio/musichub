import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { FeatureModulesController } from "./feature-modules.controller";
import { FeatureModulesService } from "./feature-modules.service";

@Module({
  imports: [PrismaModule],
  controllers: [FeatureModulesController],
  providers: [FeatureModulesService],
  exports: [FeatureModulesService],
})
export class FeatureModulesModule {}
