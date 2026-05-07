import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { FeatureModulesModule } from "../feature-modules/feature-modules.module";
import { CatalogController } from "./catalog.controller";
import { CatalogService } from "./catalog.service";
import { LocalStorageService } from "./local-storage.service";

@Module({
  imports: [AuthModule, PrismaModule, FeatureModulesModule],
  controllers: [CatalogController],
  providers: [CatalogService, LocalStorageService],
  exports: [CatalogService, LocalStorageService],
})
export class CatalogModule {}
