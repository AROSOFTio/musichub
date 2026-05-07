import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { UpdateFeatureModuleDto } from "./dto/update-feature-module.dto";
import { FEATURE_MODULE_DEFINITIONS } from "./module-definitions";

export type FeatureScope = "public" | "admin" | "api";

@Injectable()
export class FeatureModulesService {
  constructor(private readonly prisma: PrismaService) {}

  async ensureDefaults() {
    await Promise.all(
      FEATURE_MODULE_DEFINITIONS.map((definition, index) =>
        this.prisma.featureModule.upsert({
          where: { key: definition.key },
          update: {
            name: definition.name,
            description: definition.description,
            category: definition.category,
            isCore: Boolean(definition.isCore),
            sortOrder: index,
          },
          create: {
            key: definition.key,
            name: definition.name,
            description: definition.description,
            category: definition.category,
            isCore: Boolean(definition.isCore),
            sortOrder: index,
          },
        }),
      ),
    );
  }

  async getAll() {
    await this.ensureDefaults();
    const modules = await this.prisma.featureModule.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    });
    return {
      grouped: this.groupByCategory(modules),
      flat: modules,
    };
  }

  async getPublicModules() {
    await this.ensureDefaults();
    const modules = await this.prisma.featureModule.findMany({
      where: { enabledPublic: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    });
    return {
      grouped: this.groupByCategory(modules),
      flat: modules,
      flags: await this.getFlags("public"),
    };
  }

  async getFlags(scope: FeatureScope) {
    await this.ensureDefaults();
    const field = this.fieldFor(scope);
    const modules = await this.prisma.featureModule.findMany();
    return modules.reduce<Record<string, boolean>>((flags, module) => {
      flags[module.key] = Boolean((module as any)[field]);
      return flags;
    }, {});
  }

  async isEnabled(key: string, scope: FeatureScope) {
    const flags = await this.getFlags(scope);
    return flags[key] ?? false;
  }

  async assertEnabled(key: string, scope: FeatureScope) {
    if (!(await this.isEnabled(key, scope))) {
      throw new ForbiddenException("This feature is currently unavailable.");
    }
  }

  async update(key: string, dto: UpdateFeatureModuleDto) {
    await this.ensureDefaults();
    const existing = await this.prisma.featureModule.findUnique({ where: { key } });
    if (!existing) {
      throw new NotFoundException("Feature module was not found.");
    }
    if (existing.isCore) {
      throw new ForbiddenException("Core modules cannot be disabled.");
    }
    return this.prisma.featureModule.update({
      where: { key },
      data: {
        enabledPublic: dto.enabledPublic ?? existing.enabledPublic,
        enabledAdmin: dto.enabledAdmin ?? existing.enabledAdmin,
        enabledApi: dto.enabledApi ?? existing.enabledApi,
      },
    });
  }

  private fieldFor(scope: FeatureScope) {
    if (scope === "admin") return "enabledAdmin";
    if (scope === "api") return "enabledApi";
    return "enabledPublic";
  }

  private groupByCategory<T extends { category: string }>(modules: T[]) {
    return modules.reduce<Record<string, T[]>>((groups, module) => {
      groups[module.category] = groups[module.category] ?? [];
      groups[module.category].push(module);
      return groups;
    }, {});
  }
}
