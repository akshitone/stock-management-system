export declare class YarnComponentDto {
    denier: number;
    twistPerMeter: number;
    weight: number;
}
export declare class CreateQualityDto {
    name: string;
    reed: number;
    picks: number;
    ends: number;
    width: number;
    totalDenier: number;
    standardWeight: number;
    shrinkage?: number;
    weavingRate: number;
    warpingRate: number;
    pasaraiRate: number;
    foldingRate: number;
    hsnCode: string;
    gstRate: number;
    description?: string;
    isActive?: boolean;
    warpDetails?: YarnComponentDto[];
    weftDetails?: YarnComponentDto[];
}
export declare class UpdateQualityDto {
    name?: string;
    reed?: number;
    picks?: number;
    ends?: number;
    width?: number;
    totalDenier?: number;
    standardWeight?: number;
    shrinkage?: number;
    weavingRate?: number;
    warpingRate?: number;
    pasaraiRate?: number;
    foldingRate?: number;
    hsnCode?: string;
    gstRate?: number;
    description?: string;
    isActive?: boolean;
    warpDetails?: YarnComponentDto[];
    weftDetails?: YarnComponentDto[];
}
//# sourceMappingURL=quality.dto.d.ts.map