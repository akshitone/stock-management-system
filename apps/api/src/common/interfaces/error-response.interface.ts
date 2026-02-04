/**
 * Error Response Interface
 * Standardized structure for all API error responses
 */
export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  errorCode?: string;
  details?: Record<string, unknown>;
  timestamp: number;
  path: string;
}
