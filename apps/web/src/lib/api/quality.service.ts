/**
 * Quality API Service
 * Handles all API calls related to Quality master data
 * Backend API: http://localhost:4000/api/masters/quality
 */

import type { Quality } from "@sms/shared";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// ============================================================================
// Types
// ============================================================================
export interface CreateQualityDto {
  name: string;
  reed: number;
  picks: number;
  ends: number;
  width: number;
  totalDenier: number;
  standardWeight: number;
  shrinkage?: number;
  weavingRate: number;
  warpingRate: number;
  pasaraiRate: number;
  foldingRate: number;
  hsnCode: string;
  gstRate: number;
  description?: string;
  isActive?: boolean;
  warpDetails?: { denier: number; twistPerMeter: number; weight: number }[];
  weftDetails?: { denier: number; twistPerMeter: number; weight: number }[];
}

export interface UpdateQualityDto extends Partial<CreateQualityDto> {}

export interface QualityFilters {
  search?: string;
  includeDeleted?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================
function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      message: "An unexpected error occurred",
      statusCode: response.status,
    }));
    throw error;
  }
  return response.json();
}

// ============================================================================
// Quality Service
// ============================================================================
export const qualityService = {
  /**
   * Get all qualities
   * GET /api/masters/quality
   */
  async getAll(filters?: QualityFilters): Promise<Quality[]> {
    const url = new URL(`${API_BASE_URL}/masters/quality`);
    if (filters?.includeDeleted) {
      url.searchParams.append("includeDeleted", filters.includeDeleted);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: getHeaders(),
    });

    return handleResponse<Quality[]>(response);
  },

  /**
   * Get active qualities only
   * GET /api/masters/quality/active
   */
  async getActive(): Promise<Quality[]> {
    const response = await fetch(`${API_BASE_URL}/masters/quality/active`, {
      method: "GET",
      headers: getHeaders(),
    });

    return handleResponse<Quality[]>(response);
  },

  /**
   * Get a single quality by ID
   * GET /api/masters/quality/:id
   */
  async getById(id: string): Promise<Quality> {
    const response = await fetch(`${API_BASE_URL}/masters/quality/${id}`, {
      method: "GET",
      headers: getHeaders(),
    });

    return handleResponse<Quality>(response);
  },

  /**
   * Create a new quality
   * POST /api/masters/quality
   */
  async create(data: CreateQualityDto): Promise<Quality> {
    const response = await fetch(`${API_BASE_URL}/masters/quality`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse<Quality>(response);
  },

  /**
   * Update an existing quality
   * PUT /api/masters/quality/:id
   */
  async update(id: string, data: UpdateQualityDto): Promise<Quality> {
    const response = await fetch(`${API_BASE_URL}/masters/quality/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse<Quality>(response);
  },

  /**
   * Soft delete a quality
   * DELETE /api/masters/quality/:id
   */
  async delete(id: string): Promise<Quality> {
    const response = await fetch(`${API_BASE_URL}/masters/quality/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    return handleResponse<Quality>(response);
  },

  /**
   * Restore a soft-deleted quality
   * POST /api/masters/quality/:id/restore
   */
  async restore(id: string): Promise<Quality> {
    const response = await fetch(
      `${API_BASE_URL}/masters/quality/${id}/restore`,
      {
        method: "POST",
        headers: getHeaders(),
      }
    );

    return handleResponse<Quality>(response);
  },
};
