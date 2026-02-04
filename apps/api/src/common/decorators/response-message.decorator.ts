import { SetMetadata } from "@nestjs/common";

/**
 * Metadata key for response message
 */
export const RESPONSE_MESSAGE_KEY = "response_message";

/**
 * Decorator to set custom success message for an endpoint
 *
 * @example
 * ```typescript
 * import { QUALITY_MESSAGES } from "../common";
 *
 * @Post()
 * @ResponseMessage(QUALITY_MESSAGES.CREATED)
 * create(@Body() dto: CreateQualityDto) {
 *   return this.qualityService.create(dto);
 * }
 * ```
 */
export const ResponseMessage = (message: string) => SetMetadata(RESPONSE_MESSAGE_KEY, message);
