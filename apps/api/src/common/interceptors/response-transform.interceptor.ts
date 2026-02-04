import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Request } from "express";
import { ApiResponse } from "../interfaces";
import { RESPONSE_MESSAGE_KEY } from "../decorators";
import { MESSAGES } from "../constants";

/**
 * Response Transformer Interceptor
 *
 * Wraps all successful responses in a consistent ApiResponse format.
 * Uses @ResponseMessage decorator for custom messages, falls back to HTTP method defaults.
 */
@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();

    // Get custom message from @ResponseMessage decorator
    const customMessage = this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler());

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
          message: customMessage || this.getDefaultMessage(request.method),
          data,
          timestamp: Date.now(),
          path: request.url,
        };
      })
    );
  }

  /**
   * Get default success message based on HTTP method
   */
  private getDefaultMessage(method: string): string {
    const messages: Record<string, string> = {
      GET: MESSAGES.GENERIC.RETRIEVED,
      POST: MESSAGES.GENERIC.CREATED,
      PUT: MESSAGES.GENERIC.UPDATED,
      PATCH: MESSAGES.GENERIC.UPDATED,
      DELETE: MESSAGES.GENERIC.DELETED,
    };
    return messages[method] || MESSAGES.GENERIC.OPERATION_SUCCESS;
  }
}
