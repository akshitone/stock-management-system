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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualityController = void 0;
const common_1 = require("@nestjs/common");
const quality_service_1 = require("./quality.service");
const quality_dto_1 = require("./quality.dto");
let QualityController = class QualityController {
    constructor(qualityService) {
        this.qualityService = qualityService;
    }
    async create(createDto) {
        const userId = "system";
        return this.qualityService.create(createDto, userId);
    }
    async findAll(includeDeleted) {
        return this.qualityService.findAll(includeDeleted === "true");
    }
    async findActive() {
        return this.qualityService.findActive();
    }
    async findOne(id) {
        return this.qualityService.findOne(id);
    }
    async update(id, updateDto) {
        const userId = "system";
        return this.qualityService.update(id, updateDto, userId);
    }
    async softDelete(id) {
        const userId = "system";
        return this.qualityService.softDelete(id, userId);
    }
    async restore(id) {
        const userId = "system";
        return this.qualityService.restore(id, userId);
    }
};
exports.QualityController = QualityController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quality_dto_1.CreateQualityDto]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("includeDeleted")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("active"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, quality_dto_1.UpdateQualityDto]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Post)(":id/restore"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QualityController.prototype, "restore", null);
exports.QualityController = QualityController = __decorate([
    (0, common_1.Controller)("masters/quality"),
    __metadata("design:paramtypes", [quality_service_1.QualityService])
], QualityController);
//# sourceMappingURL=quality.controller.js.map