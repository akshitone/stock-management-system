import { QualityService } from "./quality.service";
import { CreateQualityDto, UpdateQualityDto } from "./quality.dto";
import { Quality } from "./quality.schema";
export declare class QualityController {
    private readonly qualityService;
    constructor(qualityService: QualityService);
    create(createDto: CreateQualityDto): Promise<Quality>;
    findAll(includeDeleted?: string): Promise<Quality[]>;
    findActive(): Promise<Quality[]>;
    findOne(id: string): Promise<Quality>;
    update(id: string, updateDto: UpdateQualityDto): Promise<Quality>;
    softDelete(id: string): Promise<Quality>;
    restore(id: string): Promise<Quality>;
}
//# sourceMappingURL=quality.controller.d.ts.map