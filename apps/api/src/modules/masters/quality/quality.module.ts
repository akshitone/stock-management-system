import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Quality, QualitySchema } from "./quality.schema";
import { QualityService } from "./quality.service";
import { QualityController } from "./quality.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quality.name, schema: QualitySchema }]),
  ],
  controllers: [QualityController],
  providers: [QualityService],
  exports: [QualityService],
})
export class QualityModule {}
