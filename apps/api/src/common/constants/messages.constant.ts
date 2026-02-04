/**
 * Centralized API Messages
 * All success and error messages are defined here for consistency
 */

// =============================================================================
// AUTH MESSAGES
// =============================================================================
export const AUTH_MESSAGES = {
  // Success
  LOGIN_SUCCESS: "User logged in successfully",
  LOGOUT_SUCCESS: "User logged out successfully",
  REGISTER_SUCCESS: "User registered successfully",
  REFRESH_SUCCESS: "Token refreshed successfully",
  PROFILE_RETRIEVED: "Profile retrieved successfully",
  PASSWORD_CHANGED: "Password changed successfully",

  // Errors
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_NOT_FOUND: "User not found",
  USER_ALREADY_EXISTS: "User with this email already exists",
  TOKEN_EXPIRED: "Token has expired",
  TOKEN_INVALID: "Invalid token",
  UNAUTHORIZED: "Unauthorized access",
  PASSWORD_MISMATCH: "Current password is incorrect",
} as const;

// =============================================================================
// QUALITY MESSAGES
// =============================================================================
export const QUALITY_MESSAGES = {
  // Success
  CREATED: "Quality created successfully",
  UPDATED: "Quality updated successfully",
  DELETED: "Quality deleted successfully",
  RETRIEVED: "Quality retrieved successfully",
  LIST_RETRIEVED: "Qualities retrieved successfully",

  // Errors
  NOT_FOUND: "Quality not found",
  CODE_EXISTS: "Quality with this code already exists",
  NAME_EXISTS: "Quality with this name already exists",
  CANNOT_DELETE_IN_USE: "Cannot delete quality that is in use",
} as const;

// =============================================================================
// PARTY MESSAGES
// =============================================================================
export const PARTY_MESSAGES = {
  // Success
  CREATED: "Party created successfully",
  UPDATED: "Party updated successfully",
  DELETED: "Party deleted successfully",
  RETRIEVED: "Party retrieved successfully",
  LIST_RETRIEVED: "Parties retrieved successfully",

  // Errors
  NOT_FOUND: "Party not found",
  GSTIN_EXISTS: "Party with this GSTIN already exists",
  HAS_TRANSACTIONS: "Cannot delete party with existing transactions",
} as const;

// =============================================================================
// BEAM MESSAGES
// =============================================================================
export const BEAM_MESSAGES = {
  // Success
  CREATED: "Beam created successfully",
  UPDATED: "Beam updated successfully",
  DELETED: "Beam deleted successfully",
  RETRIEVED: "Beam retrieved successfully",
  LIST_RETRIEVED: "Beams retrieved successfully",
  STATUS_UPDATED: "Beam status updated successfully",

  // Errors
  NOT_FOUND: "Beam not found",
  ALREADY_LOADED: "Beam is already loaded",
  ALREADY_FINISHED: "Beam is already finished",
  CANNOT_DELETE_ACTIVE: "Cannot delete active beam",
} as const;

// =============================================================================
// TAKA MESSAGES
// =============================================================================
export const TAKA_MESSAGES = {
  // Success
  CREATED: "Taka created successfully",
  BATCH_CREATED: "Takas created successfully",
  UPDATED: "Taka updated successfully",
  DELETED: "Taka deleted successfully",
  RETRIEVED: "Taka retrieved successfully",
  LIST_RETRIEVED: "Takas retrieved successfully",

  // Errors
  NOT_FOUND: "Taka not found",
  ALREADY_ISSUED: "Taka is already issued",
  ALREADY_SOLD: "Taka is already sold",
  DUAL_UOM_REQUIRED: "Both meters and takas are required",
} as const;

// =============================================================================
// INVOICE MESSAGES
// =============================================================================
export const INVOICE_MESSAGES = {
  // Success
  CREATED: "Invoice created successfully",
  UPDATED: "Invoice updated successfully",
  DELETED: "Invoice deleted successfully",
  RETRIEVED: "Invoice retrieved successfully",
  LIST_RETRIEVED: "Invoices retrieved successfully",

  // Errors
  NOT_FOUND: "Invoice not found",
  ALREADY_PAID: "Invoice is already paid",
  CANNOT_MODIFY_PAID: "Cannot modify paid invoice",
  INSUFFICIENT_STOCK: "Insufficient stock for invoice items",
} as const;

// =============================================================================
// PAYMENT MESSAGES
// =============================================================================
export const PAYMENT_MESSAGES = {
  // Success
  CREATED: "Payment recorded successfully",
  UPDATED: "Payment updated successfully",
  DELETED: "Payment deleted successfully",
  RETRIEVED: "Payment retrieved successfully",
  LIST_RETRIEVED: "Payments retrieved successfully",

  // Errors
  NOT_FOUND: "Payment not found",
  EXCEEDS_OUTSTANDING: "Payment amount exceeds outstanding balance",
  INVALID_ALLOCATION: "Invalid payment allocation",
} as const;

// =============================================================================
// GENERIC MESSAGES
// =============================================================================
export const GENERIC_MESSAGES = {
  // Success (fallbacks)
  RETRIEVED: "Data retrieved successfully",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",
  OPERATION_SUCCESS: "Operation completed successfully",

  // Errors
  NOT_FOUND: "Resource not found",
  BAD_REQUEST: "Invalid request",
  INTERNAL_ERROR: "Internal server error",
  VALIDATION_FAILED: "Validation failed",
  DUPLICATE_ENTRY: "Duplicate entry",
  FORBIDDEN: "Access forbidden",
} as const;

// =============================================================================
// ALL MESSAGES EXPORT
// =============================================================================
export const MESSAGES = {
  AUTH: AUTH_MESSAGES,
  QUALITY: QUALITY_MESSAGES,
  PARTY: PARTY_MESSAGES,
  BEAM: BEAM_MESSAGES,
  TAKA: TAKA_MESSAGES,
  INVOICE: INVOICE_MESSAGES,
  PAYMENT: PAYMENT_MESSAGES,
  GENERIC: GENERIC_MESSAGES,
} as const;
