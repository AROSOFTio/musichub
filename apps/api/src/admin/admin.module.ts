import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

import { CatalogModule } from "../catalog/catalog.module";
import { FeatureModulesModule } from "../feature-modules/feature-modules.module";

@Module({
  imports: [PrismaModule, AuthModule, CatalogModule, FeatureModulesModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

