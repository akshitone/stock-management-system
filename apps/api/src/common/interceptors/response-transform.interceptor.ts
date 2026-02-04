import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Request } from "express";
import { ApiResponse } from "../interfaces";

/**
 * Response Transformer Interceptor
 *
 * Wraps all successful responses in a consistent ApiResponse format.
 * Works in conjunction with HttpExceptionFilter for unified response structure.
 */
@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        // If data is already an ApiResponse (manually constructed), return as-is
        if (data && typeof data === "object" && "success" in data && "statusCode" in data) {
          return data as ApiResponse<T>;
        }

        // Wrap the response in ApiResponse format
        return {
          success: true,
          statusCode: response.statusCode,
          message: this.getSuccessMessage(request.method),
          data,
          timestamp: Date.now(),
          path: request.url,
        };
      })
    );
  }

  /**
   * Get appropriate success message based on HTTP method
   */
  private getSuccessMessage(method: string): string {
    const messages: Record<string, string> = {
      GET: "Data retrieved successfully",
      POST: "Resource created successfully",
      PUT: "Resource updated successfully",
      PATCH: "Resource updated successfully",
      DELETE: "Resource deleted successfully",
    };
    return messages[method] || "Operation completed successfully";
  }
}
