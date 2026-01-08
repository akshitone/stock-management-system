import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
  MaxLength,
} from "class-validator";
import { Type } from "class-transformer";

// Yarn Component DTO
export class YarnComponentDto {
  @IsNumber()
  @Min(0)
  denier: number;

  @IsNumber()
  @Min(0)
  twistPerMeter: number;

  @IsNumber()
  @Min(0)
  weight: number;
}

// Create Quality DTO
export class CreateQualityDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNumber()
  @Min(0)
  reed: number;

  @IsNumber()
  @Min(0)
  picks: number;

  @IsNumber()
  @Min(0)
  ends: number;

  @IsNumber()
  @Min(0)
  width: number;

  @IsNumber()
  @Min(0)
  totalDenier: number;

  @IsNumber()
  @Min(0)
  standardWeight: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  shrinkage?: number;

  @IsNumber()
  @Min(0)
  weavingRate: number;

  @IsNumber()
  @Min(0)
  warpingRate: number;

  @IsNumber()
  @Min(0)
  pasaraiRate: number;

  @IsNumber()
  @Min(0)
  foldingRate: number;

  @IsString()
  @MaxLength(8)
  hsnCode: string;

  @IsNumber()
  @Min(0)
  gstRate: number;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => YarnComponentDto)
  @IsOptional()
  warpDetails?: YarnComponentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => YarnComponentDto)
  @IsOptional()
  weftDetails?: YarnComponentDto[];
}

// Update Quality DTO (all fields optional)
export class UpdateQualityDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  reed?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  picks?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  ends?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  width?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalDenier?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  standardWeight?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  shrinkage?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  weavingRate?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  warpingRate?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  pasaraiRate?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  foldingRate?: number;

  @IsString()
  @MaxLength(8)
  @IsOptional()
  hsnCode?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  gstRate?: number;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => YarnComponentDto)
  @IsOptional()
  warpDetails?: YarnComponentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => YarnComponentDto)
  @IsOptional()
  weftDetails?: YarnComponentDto[];
}
