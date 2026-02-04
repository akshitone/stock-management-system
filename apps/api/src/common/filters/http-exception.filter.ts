import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { BusinessException } from "../exceptions";
import { ErrorResponse } from "../interfaces";

/**
 * Global HTTP Exception Filter
 *
 * Catches all exceptions and transforms them into a consistent JSON response format.
 * Handles:
 * - NestJS HttpExceptions (including validation errors)
 * - Custom BusinessExceptions with error codes
 * - Mongoose errors (CastError, ValidationError, duplicate key)
 * - Unknown errors (returns 500 Internal Server Error)
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception, request.url);

    // Log error (but not client errors like 4xx)
    if (errorResponse.statusCode >= 500) {
      this.logger.error(
        `${request.method} ${request.url} - ${errorResponse.statusCode}`,
        exception instanceof Error ? exception.stack : String(exception)
      );
    } else {
      this.logger.warn(
        `${request.method} ${request.url} - ${errorResponse.statusCode}: ${errorResponse.message}`
      );
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown, path: string): ErrorResponse {
    const timestamp = Date.now();

    // Handle Business Exceptions (custom domain errors)
    if (exception instanceof BusinessException) {
      const exceptionResponse = exception.getResponse() as Record<string, unknown>;
      return {
        statusCode: exception.getStatus(),
        message: exceptionResponse.message as string,
        error: this.getErrorName(exception.getStatus()),
        errorCode: exception.errorCode,
        details: exception.details,
        timestamp,
        path,
      };
    }

    // Handle standard NestJS HttpExceptions
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Handle validation errors (class-validator)
      if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
        const response = exceptionResponse as Record<string, unknown>;
        return {
          statusCode: status,
          message: response.message as string | string[],
          error: (response.error as string) || this.getErrorName(status),
          timestamp,
          path,
        };
      }

      return {
        statusCode: status,
        message: exception.message,
        error: this.getErrorName(status),
        timestamp,
        path,
      };
    }

    // Handle Mongoose CastError (invalid ObjectId)
    if (exception instanceof MongooseError.CastError) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Invalid ${exception.kind}: ${exception.value}`,
        error: "Bad Request",
        errorCode: "INVALID_ID",
        details: { path: exception.path, value: exception.value },
        timestamp,
        path,
      };
    }

    // Handle Mongoose ValidationError
    if (exception instanceof MongooseError.ValidationError) {
      const messages = Object.values(exception.errors).map((err) => err.message);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: messages,
        error: "Validation Error",
        errorCode: "MONGOOSE_VALIDATION",
        timestamp,
        path,
      };
    }

    // Handle MongoDB duplicate key error (code 11000)
    if (this.isMongoServerError(exception) && exception.code === 11000) {
      const field = Object.keys(exception.keyPattern || {})[0] || "field";
      const value = exception.keyValue?.[field] || "unknown";
      return {
        statusCode: HttpStatus.CONFLICT,
        message: `Duplicate value for ${field}: ${value}`,
        error: "Conflict",
        errorCode: "DUPLICATE_KEY",
        details: { field, value },
        timestamp,
        path,
      };
    }

    // Unknown error - return 500
    this.logger.error("Unhandled exception", exception);
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
      error: "Internal Server Error",
      timestamp,
      path,
    };
  }

  private getErrorName(status: HttpStatus): string {
    const statusNames: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: "Bad Request",
      [HttpStatus.UNAUTHORIZED]: "Unauthorized",
      [HttpStatus.FORBIDDEN]: "Forbidden",
      [HttpStatus.NOT_FOUND]: "Not Found",
      [HttpStatus.CONFLICT]: "Conflict",
      [HttpStatus.UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
      [HttpStatus.INTERNAL_SERVER_ERROR]: "Internal Server Error",
    };
    return statusNames[status] || "Error";
  }

  /**
   * Type guard for MongoDB server errors
   */
  private isMongoServerError(exception: unknown): exception is {
    code: number;
    keyPattern?: Record<string, number>;
    keyValue?: Record<string, string>;
  } {
    return (
      typeof exception === "object" &&
      exception !== null &&
      "code" in exception &&
      typeof (exception as Record<string, unknown>).code === "number"
    );
  }
}
