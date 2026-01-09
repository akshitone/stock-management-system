"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_pino_1 = require("nestjs-pino");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.setGlobalPrefix("api");
    app.enableCors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Stock Management System API")
        .setDescription("API for Textile Manufacturing & Trading Stock Management")
        .setVersion("1.0")
        .addTag("masters", "Master data management")
        .addTag("production", "Production workflow")
        .addTag("inventory", "Stock tracking")
        .addTag("trading", "Sales operations")
        .addTag("finance", "Financial settlements")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/docs", app, document);
    const port = process.env.PORT || 4000;
    await app.listen(port);
    const logger = app.get(nestjs_pino_1.Logger);
    logger.log(`🚀 API running on http://localhost:${port}/api`);
    logger.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map