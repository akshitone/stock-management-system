// Common base interface for all entities
export interface BaseEntity {
  _id: string;
  id: string; // UUID v4
  isActive: boolean;
  createdBy: string;
  createdAt: number;
  updatedBy?: string;
  updatedAt?: number;
  deletedBy?: string;
  deletedAt?: number;
}

// Audit fields mixin
export interface AuditFields {
  createdBy: string;
  createdAt: number;
  updatedBy?: string;
  updatedAt?: number;
  deletedBy?: string;
  deletedAt?: number;
}

// User type for auth
export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
