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
exports.QualityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const quality_schema_1 = require("./quality.schema");
let QualityService = class QualityService {
    constructor(qualityModel) {
        this.qualityModel = qualityModel;
    }
    async create(createDto, userId) {
        const quality = new this.qualityModel({
            ...createDto,
            createdBy: userId,
            createdAt: Date.now(),
        });
        return quality.save();
    }
    async findAll(includeDeleted = false) {
        const filter = includeDeleted ? {} : { deletedAt: null };
        return this.qualityModel.find(filter).sort({ name: 1 }).exec();
    }
    async findActive() {
        return this.qualityModel
            .find({ isActive: true, deletedAt: null })
            .sort({ name: 1 })
            .exec();
    }
    async findOne(id) {
        const quality = await this.qualityModel
            .findOne({ id, deletedAt: null })
            .exec();
        if (!quality) {
            throw new common_1.NotFoundException(`Quality with ID ${id} not found`);
        }
        return quality;
    }
    async findById(mongoId) {
        const quality = await this.qualityModel
            .findOne({ _id: mongoId, deletedAt: null })
            .exec();
        if (!quality) {
            throw new common_1.NotFoundException(`Quality not found`);
        }
        return quality;
    }
    async update(id, updateDto, userId) {
        const quality = await this.qualityModel
            .findOneAndUpdate({ id, deletedAt: null }, {
            ...updateDto,
            updatedBy: userId,
            updatedAt: Date.now(),
        }, { new: true })
            .exec();
        if (!quality) {
            throw new common_1.NotFoundException(`Quality with ID ${id} not found`);
        }
        return quality;
    }
    async softDelete(id, userId) {
        const quality = await this.qualityModel
            .findOneAndUpdate({ id, deletedAt: null }, {
            deletedBy: userId,
            deletedAt: Date.now(),
            isActive: false,
        }, { new: true })
            .exec();
        if (!quality) {
            throw new common_1.NotFoundException(`Quality with ID ${id} not found`);
        }
        return quality;
    }
    async restore(id, userId) {
        const quality = await this.qualityModel
            .findOneAndUpdate({ id, deletedAt: { $ne: null } }, {
            deletedBy: null,
            deletedAt: null,
            updatedBy: userId,
            updatedAt: Date.now(),
        }, { new: true })
            .exec();
        if (!quality) {
            throw new common_1.NotFoundException(`Quality with ID ${id} not found or not deleted`);
        }
        return quality;
    }
    async hardDelete(id) {
        const result = await this.qualityModel.deleteOne({ id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Quality with ID ${id} not found`);
        }
    }
};
exports.QualityService = QualityService;
exports.QualityService = QualityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(quality_schema_1.Quality.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QualityService);
//# sourceMappingURL=quality.service.js.map