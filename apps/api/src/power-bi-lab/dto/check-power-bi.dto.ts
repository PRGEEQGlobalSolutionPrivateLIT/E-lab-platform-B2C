import {
  Type,
} from 'class-transformer';

import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

/* =========================================================
   POWER BI DATASET DTO
========================================================= */

export class PowerBIDatasetDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsBoolean()
  loaded?: boolean;

  @IsOptional()
  @IsString()
  tableName?: string;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  columns?: string[];

  @IsOptional()
  @IsNumber()
  rowCount?: number;
}

/* =========================================================
   POWER BI TABLE DTO
========================================================= */

export class PowerBITableDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  datasetId?: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  tableName?: string;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  columns?: string[];

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  headers?: string[];

  @IsOptional()
  @IsNumber()
  rowCount?: number;

  @IsOptional()
  @IsBoolean()
  loaded?: boolean;
}

/* =========================================================
   POWER BI TRANSFORM DTO
========================================================= */

export class PowerBITransformDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  datasetId?: string;

  @IsOptional()
  @IsString()
  tableName?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  operation?: string;

  @IsOptional()
  @IsString()
  column?: string;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  columns?: string[];

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  replacementValue?: string;

  @IsOptional()
  @IsBoolean()
  applied?: boolean;
}

/* =========================================================
   POWER BI RELATIONSHIP DTO
========================================================= */

export class PowerBIRelationshipDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  fromTable!: string;

  @IsString()
  fromColumn!: string;

  @IsString()
  toTable!: string;

  @IsString()
  toColumn!: string;

  @IsOptional()
  @IsString()
  cardinality?: string;

  @IsOptional()
  @IsString()
  crossFilterDirection?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

/* =========================================================
   POWER BI MEASURE DTO
========================================================= */

export class PowerBIMeasureDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  measureName?: string;

  @IsString()
  expression!: string;

  @IsOptional()
  @IsString()
  tableName?: string;
}

/* =========================================================
   POWER BI VISUAL DTO
========================================================= */

export class PowerBIVisualDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  visualType?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  tableName?: string;

  @IsOptional()
  @IsString()
  xAxis?: string;

  @IsOptional()
  @IsString()
  yAxis?: string;

  @IsOptional()
  @IsString()
  legend?: string;

  @IsOptional()
  @IsString()
  aggregation?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  values?: string[];

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  fields?: string[];

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  measures?: string[];
}

/* =========================================================
   POWER BI FILTER DTO
========================================================= */

export class PowerBIFilterDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  tableName?: string;

  @IsString()
  field!: string;

  @IsOptional()
  @IsString()
  operator?: string;

  @IsOptional()
  value?:
    | string
    | number
    | boolean
    | null;

  @IsOptional()
  @IsArray()
  values?: (
    | string
    | number
    | boolean
    | null
  )[];
}

/* =========================================================
   POWER BI WORKSPACE DTO
========================================================= */

export class PowerBIWorkspaceDto {
  @IsOptional()
  @IsString()
  selectedDatasetId?: string;

  @IsOptional()
  @IsString()
  loadedDatasetId?: string;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  selectedDatasetIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  loadedDatasetIds?: string[];

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  tableName?: string;

  @IsOptional()
  @IsArray()
  @IsString({
    each: true,
  })
  headers?: string[];

  @IsOptional()
  @IsNumber()
  rowCount?: number;

  @IsOptional()
  @IsBoolean()
  hasData?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(
    () => PowerBIDatasetDto,
  )
  datasets?: PowerBIDatasetDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(
    () => PowerBITableDto,
  )
  tables?: PowerBITableDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(
    () => PowerBITransformDto,
  )
  transforms?: PowerBITransformDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(
    () => PowerBIRelationshipDto,
  )
  relationships?: PowerBIRelationshipDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(
    () => PowerBIMeasureDto,
  )
  measures?: PowerBIMeasureDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(
    () => PowerBIMeasureDto,
  )
  daxMeasures?: PowerBIMeasureDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(
    () => PowerBIVisualDto,
  )
  visuals?: PowerBIVisualDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(
    () => PowerBIFilterDto,
  )
  filters?: PowerBIFilterDto[];
}

/* =========================================================
   CHECK POWER BI DTO
========================================================= */

export class CheckPowerBIDto {
  @IsString()
  problemSlug!: string;

  @IsObject()
  @ValidateNested()
  @Type(
    () => PowerBIWorkspaceDto,
  )
  workspace!: PowerBIWorkspaceDto;
}