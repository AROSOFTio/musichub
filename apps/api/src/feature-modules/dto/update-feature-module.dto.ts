import { IsBoolean, IsOptional } from "class-validator";

export class UpdateFeatureModuleDto {
  @IsOptional()
  @IsBoolean()
  enabledPublic?: boolean;

  @IsOptional()
  @IsBoolean()
  enabledAdmin?: boolean;

  @IsOptional()
  @IsBoolean()
  enabledApi?: boolean;
}
