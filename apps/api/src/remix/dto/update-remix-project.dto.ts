import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateRemixProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(40)
  @Max(240)
  bpm?: number;

  @IsOptional()
  @IsNumber()
  @Min(-12)
  @Max(12)
  pitchShift?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.5)
  @Max(2)
  tempo?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  volume?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(12)
  bassBoost?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(12)
  trebleBoost?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  reverb?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  echo?: number;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
