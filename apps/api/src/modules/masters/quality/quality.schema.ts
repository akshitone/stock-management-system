import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Yarn Component subdocument
@Schema({ _id: false })
export class YarnComponent {
  @Prop({ required: true })
  denier: number;

  @Prop({ required: true })
  twistPerMeter: number;

  @Prop({ required: true })
  weight: number;
}

export const YarnComponentSchema = SchemaFactory.createForClass(YarnComponent);

// Quality Schema
@Schema({ timestamps: false, collection: "qualities" })
export class Quality extends Document {
  @Prop({ default: () => uuidv4() })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  reed: number;

  @Prop({ required: true })
  picks: number;

  @Prop({ required: true })
  ends: number;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  totalDenier: number;

  @Prop({ required: true })
  standardWeight: number;

  @Prop({ default: 0 })
  shrinkage: number;

  @Prop({ required: true })
  weavingRate: number;

  @Prop({ required: true })
  warpingRate: number;

  @Prop({ required: true })
  pasaraiRate: number;

  @Prop({ required: true })
  foldingRate: number;

  @Prop({ required: true })
  hsnCode: string;

  @Prop({ required: true })
  gstRate: number;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  // Yarn Composition
  @Prop({ type: [YarnComponentSchema], default: [] })
  warpDetails: YarnComponent[];

  @Prop({ type: [YarnComponentSchema], default: [] })
  weftDetails: YarnComponent[];

  // Audit Fields
  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true })
  createdAt: number;

  @Prop()
  updatedBy: string;

  @Prop()
  updatedAt: number;

  @Prop()
  deletedBy: string;

  @Prop()
  deletedAt: number;
}

export const QualitySchema = SchemaFactory.createForClass(Quality);

// Indexes
QualitySchema.index({ name: 1 });
QualitySchema.index({ hsnCode: 1 });
QualitySchema.index({ isActive: 1 });
QualitySchema.index({ deletedAt: 1 });
