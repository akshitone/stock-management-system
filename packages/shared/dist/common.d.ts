export interface BaseEntity {
    _id: string;
    id: string;
    isActive: boolean;
    createdBy: string;
    createdAt: number;
    updatedBy?: string;
    updatedAt?: number;
    deletedBy?: string;
    deletedAt?: number;
}
export interface AuditFields {
    createdBy: string;
    createdAt: number;
    updatedBy?: string;
    updatedAt?: number;
    deletedBy?: string;
    deletedAt?: number;
}
export type UserRole = "admin" | "user";
export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}
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
//# sourceMappingURL=common.d.ts.map