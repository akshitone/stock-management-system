/**
 * Unified API Response Interface
 * Used for both success and error responses to ensure consistent format
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string | string[];
  data?: T;
  error?: string;
  errorCode?: string;
  details?: Record<string, unknown>;
  timestamp: number;
  path: string;
}

/**
 * Helper function to create a success response
 */
export function createSuccessResponse<T>(
  data: T,
  message: string,
  statusCode: number,
  path: string
): ApiResponse<T> {
  return {
    success: true,
    statusCode,
    message,
    data,
    timestamp: Date.now(),
    path,
  };
}

/**
 * Helper function to create an error response
 */
export function createErrorResponse(
  message: string | string[],
  statusCode: number,
  path: string,
  error?: string,
  errorCode?: string,
  details?: Record<string, unknown>
): ApiResponse<null> {
  return {
    success: false,
    statusCode,
    message,
    error,
    errorCode,
    details,
    timestamp: Date.now(),
    path,
  };
}
