import { Model } from "mongoose";
import { Quality } from "./quality.schema";
import { CreateQualityDto, UpdateQualityDto } from "./quality.dto";
export declare class QualityService {
    private qualityModel;
    constructor(qualityModel: Model<Quality>);
    create(createDto: CreateQualityDto, userId: string): Promise<Quality>;
    findAll(includeDeleted?: boolean): Promise<Quality[]>;
    findActive(): Promise<Quality[]>;
    findOne(id: string): Promise<Quality>;
    findById(mongoId: string): Promise<Quality>;
    update(id: string, updateDto: UpdateQualityDto, userId: string): Promise<Quality>;
    softDelete(id: string, userId: string): Promise<Quality>;
    restore(id: string, userId: string): Promise<Quality>;
    hardDelete(id: string): Promise<void>;
}
//# sourceMappingURL=quality.service.d.ts.map