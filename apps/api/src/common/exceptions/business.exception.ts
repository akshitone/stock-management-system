import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * Base class for all business exceptions
 * Provides a custom error code for client-side handling
 */
export abstract class BusinessException extends HttpException {
  constructor(
    message: string,
    public readonly errorCode: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly details?: Record<string, unknown>
  ) {
    super({ message, errorCode, details }, status);
  }
}

/**
 * Thrown when Taka/Invoice items are missing required dual UOM (meters AND takas)
 */
export class DualUomRequiredException extends BusinessException {
  constructor(field?: string) {
    super(
      `Both meters and takas are required${field ? ` for ${field}` : ""}`,
      "DUAL_UOM_REQUIRED",
      HttpStatus.BAD_REQUEST,
      { field }
    );
  }
}

/**
 * Thrown when stock quantity is insufficient for the operation
 */
export class InsufficientStockException extends BusinessException {
  constructor(
    qualityId: string,
    requested: number,
    available: number,
    unit: "meters" | "takas" = "meters"
  ) {
    super(
      `Insufficient stock: requested ${requested} ${unit}, available ${available} ${unit}`,
      "INSUFFICIENT_STOCK",
      HttpStatus.BAD_REQUEST,
      { qualityId, requested, available, unit }
    );
  }
}

/**
 * Thrown when attempting to modify an already paid invoice
 */
export class InvoiceAlreadyPaidException extends BusinessException {
  constructor(invoiceId: string) {
    super(
      "Invoice is already fully paid and cannot be modified",
      "INVOICE_ALREADY_PAID",
      HttpStatus.BAD_REQUEST,
      { invoiceId }
    );
  }
}

/**
 * Thrown when a requested entity is not found
 */
export class EntityNotFoundException extends BusinessException {
  constructor(entity: string, identifier: string | Record<string, unknown>) {
    const id = typeof identifier === "string" ? identifier : JSON.stringify(identifier);
    super(`${entity} not found: ${id}`, "ENTITY_NOT_FOUND", HttpStatus.NOT_FOUND, {
      entity,
      identifier,
    });
  }
}

/**
 * Thrown when attempting to create a duplicate entity
 */
export class DuplicateEntityException extends BusinessException {
  constructor(entity: string, field: string, value: string) {
    super(
      `${entity} with ${field} '${value}' already exists`,
      "DUPLICATE_ENTITY",
      HttpStatus.CONFLICT,
      { entity, field, value }
    );
  }
}

/**
 * Thrown when operation is not allowed due to entity state
 */
export class InvalidOperationException extends BusinessException {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, "INVALID_OPERATION", HttpStatus.BAD_REQUEST, details);
  }
}
