import { ArrayMaxSize, IsArray, IsOptional, IsString, Length } from 'class-validator';

export class UpdatePlacementDto {
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  stageIds!: string[];

  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  moduleIds!: string[];

  @IsOptional()
  @IsString()
  @Length(5, 300)
  reason?: string;
}