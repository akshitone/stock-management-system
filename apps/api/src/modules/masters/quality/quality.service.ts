import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Quality } from "./quality.schema";
import { CreateQualityDto, UpdateQualityDto } from "./quality.dto";

@Injectable()
export class QualityService {
  constructor(
    @InjectModel(Quality.name) private qualityModel: Model<Quality>
  ) {}

  // Create
  async create(createDto: CreateQualityDto, userId: string): Promise<Quality> {
    const quality = new this.qualityModel({
      ...createDto,
      createdBy: userId,
      createdAt: Date.now(),
    });
    return quality.save();
  }

  // Find All (with soft delete filter)
  async findAll(includeDeleted = false): Promise<Quality[]> {
    const filter = includeDeleted ? {} : { deletedAt: null };
    return this.qualityModel.find(filter).sort({ name: 1 }).exec();
  }

  // Find Active Only
  async findActive(): Promise<Quality[]> {
    return this.qualityModel
      .find({ isActive: true, deletedAt: null })
      .sort({ name: 1 })
      .exec();
  }

  // Find One by ID
  async findOne(id: string): Promise<Quality> {
    const quality = await this.qualityModel
      .findOne({ id, deletedAt: null })
      .exec();
    if (!quality) {
      throw new NotFoundException(`Quality with ID ${id} not found`);
    }
    return quality;
  }

  // Find by MongoDB _id
  async findById(mongoId: string): Promise<Quality> {
    const quality = await this.qualityModel
      .findOne({ _id: mongoId, deletedAt: null })
      .exec();
    if (!quality) {
      throw new NotFoundException(`Quality not found`);
    }
    return quality;
  }

  // Update
  async update(
    id: string,
    updateDto: UpdateQualityDto,
    userId: string
  ): Promise<Quality> {
    const quality = await this.qualityModel
      .findOneAndUpdate(
        { id, deletedAt: null },
        {
          ...updateDto,
          updatedBy: userId,
          updatedAt: Date.now(),
        },
        { new: true }
      )
      .exec();

    if (!quality) {
      throw new NotFoundException(`Quality with ID ${id} not found`);
    }
    return quality;
  }

  // Soft Delete
  async softDelete(id: string, userId: string): Promise<Quality> {
    const quality = await this.qualityModel
      .findOneAndUpdate(
        { id, deletedAt: null },
        {
          deletedBy: userId,
          deletedAt: Date.now(),
          isActive: false,
        },
        { new: true }
      )
      .exec();

    if (!quality) {
      throw new NotFoundException(`Quality with ID ${id} not found`);
    }
    return quality;
  }

  // Restore
  async restore(id: string, userId: string): Promise<Quality> {
    const quality = await this.qualityModel
      .findOneAndUpdate(
        { id, deletedAt: { $ne: null } },
        {
          deletedBy: null,
          deletedAt: null,
          updatedBy: userId,
          updatedAt: Date.now(),
        },
        { new: true }
      )
      .exec();

    if (!quality) {
      throw new NotFoundException(
        `Quality with ID ${id} not found or not deleted`
      );
    }
    return quality;
  }

  // Hard Delete (permanent - use with caution)
  async hardDelete(id: string): Promise<void> {
    const result = await this.qualityModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Quality with ID ${id} not found`);
    }
  }
}
