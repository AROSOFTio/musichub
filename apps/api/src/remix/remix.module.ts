import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "../auth/auth.module";
import { CatalogModule } from "../catalog/catalog.module";
import { FeatureModulesModule } from "../feature-modules/feature-modules.module";
import { PrismaModule } from "../prisma/prisma.module";
import { RemixController } from "./remix.controller";
import { RemixService } from "./remix.service";

@Module({
  imports: [AuthModule, CatalogModule, ConfigModule, FeatureModulesModule, PrismaModule],
  controllers: [RemixController],
  providers: [RemixService],
})
export class RemixModule {}
