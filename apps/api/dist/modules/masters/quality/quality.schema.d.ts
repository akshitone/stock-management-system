import { Document } from "mongoose";
export declare class YarnComponent {
    denier: number;
    twistPerMeter: number;
    weight: number;
}
export declare const YarnComponentSchema: import("mongoose").Schema<YarnComponent, import("mongoose").Model<YarnComponent, any, any, any, Document<unknown, any, YarnComponent, any, {}> & YarnComponent & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, YarnComponent, Document<unknown, {}, import("mongoose").FlatRecord<YarnComponent>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<YarnComponent> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Quality extends Document {
    id: string;
    name: string;
    reed: number;
    picks: number;
    ends: number;
    width: number;
    totalDenier: number;
    standardWeight: number;
    shrinkage: number;
    weavingRate: number;
    warpingRate: number;
    pasaraiRate: number;
    foldingRate: number;
    hsnCode: string;
    gstRate: number;
    description: string;
    isActive: boolean;
    warpDetails: YarnComponent[];
    weftDetails: YarnComponent[];
    createdBy: string;
    createdAt: number;
    updatedBy: string;
    updatedAt: number;
    deletedBy: string;
    deletedAt: number;
}
export declare const QualitySchema: import("mongoose").Schema<Quality, import("mongoose").Model<Quality, any, any, any, Document<unknown, any, Quality, any, {}> & Quality & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Quality, Document<unknown, {}, import("mongoose").FlatRecord<Quality>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Quality> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=quality.schema.d.ts.map