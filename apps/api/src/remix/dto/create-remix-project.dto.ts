import { IsNotEmpty, IsOptional, IsString, Max, Min, IsNumber } from "class-validator";

export class CreateRemixProjectDto {
  @IsString()
  @IsNotEmpty()
  sourceSongId!: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(40)
  @Max(240)
  bpm?: number;
}
