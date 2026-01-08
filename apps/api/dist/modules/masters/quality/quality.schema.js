"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualitySchema = exports.Quality = exports.YarnComponentSchema = exports.YarnComponent = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let YarnComponent = class YarnComponent {
};
exports.YarnComponent = YarnComponent;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], YarnComponent.prototype, "denier", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], YarnComponent.prototype, "twistPerMeter", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], YarnComponent.prototype, "weight", void 0);
exports.YarnComponent = YarnComponent = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], YarnComponent);
exports.YarnComponentSchema = mongoose_1.SchemaFactory.createForClass(YarnComponent);
let Quality = class Quality extends mongoose_2.Document {
};
exports.Quality = Quality;
__decorate([
    (0, mongoose_1.Prop)({ default: () => (0, uuid_1.v4)() }),
    __metadata("design:type", String)
], Quality.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Quality.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "reed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "picks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "ends", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "width", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "totalDenier", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "standardWeight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Quality.prototype, "shrinkage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "weavingRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "warpingRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "pasaraiRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "foldingRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Quality.prototype, "hsnCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "gstRate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Quality.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Quality.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.YarnComponentSchema], default: [] }),
    __metadata("design:type", Array)
], Quality.prototype, "warpDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.YarnComponentSchema], default: [] }),
    __metadata("design:type", Array)
], Quality.prototype, "weftDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Quality.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quality.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Quality.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Quality.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Quality.prototype, "deletedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Quality.prototype, "deletedAt", void 0);
exports.Quality = Quality = __decorate([
    (0, mongoose_1.Schema)({ timestamps: false, collection: "qualities" })
], Quality);
exports.QualitySchema = mongoose_1.SchemaFactory.createForClass(Quality);
exports.QualitySchema.index({ name: 1 });
exports.QualitySchema.index({ hsnCode: 1 });
exports.QualitySchema.index({ isActive: 1 });
exports.QualitySchema.index({ deletedAt: 1 });
//# sourceMappingURL=quality.schema.js.map