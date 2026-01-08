import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { QualityService } from "./quality.service";
import { CreateQualityDto, UpdateQualityDto } from "./quality.dto";
import { Quality } from "./quality.schema";

@Controller("masters/quality")
export class QualityController {
  constructor(private readonly qualityService: QualityService) {}

  // POST /api/masters/quality
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateQualityDto): Promise<Quality> {
    // TODO: Get userId from JWT token when auth is implemented
    const userId = "system";
    return this.qualityService.create(createDto, userId);
  }

  // GET /api/masters/quality
  @Get()
  async findAll(
    @Query("includeDeleted") includeDeleted?: string
  ): Promise<Quality[]> {
    return this.qualityService.findAll(includeDeleted === "true");
  }

  // GET /api/masters/quality/active
  @Get("active")
  async findActive(): Promise<Quality[]> {
    return this.qualityService.findActive();
  }

  // GET /api/masters/quality/:id
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Quality> {
    return this.qualityService.findOne(id);
  }

  // PUT /api/masters/quality/:id
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDto: UpdateQualityDto
  ): Promise<Quality> {
    // TODO: Get userId from JWT token when auth is implemented
    const userId = "system";
    return this.qualityService.update(id, updateDto, userId);
  }

  // DELETE /api/masters/quality/:id (soft delete)
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async softDelete(@Param("id") id: string): Promise<Quality> {
    // TODO: Get userId from JWT token when auth is implemented
    const userId = "system";
    return this.qualityService.softDelete(id, userId);
  }

  // POST /api/masters/quality/:id/restore
  @Post(":id/restore")
  async restore(@Param("id") id: string): Promise<Quality> {
    // TODO: Get userId from JWT token when auth is implemented
    const userId = "system";
    return this.qualityService.restore(id, userId);
  }
}
