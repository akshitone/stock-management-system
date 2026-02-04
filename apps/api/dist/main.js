"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const app_module_1 = require("./app.module");
const common_2 = require("./common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    const configService = app.get(config_1.ConfigService);
    const isProduction = configService.get("NODE_ENV") === "production";
    const port = configService.get("PORT") || 4000;
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.setGlobalPrefix("api");
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: "1",
    });
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: isProduction ? undefined : false,
        crossOriginEmbedderPolicy: isProduction,
    }));
    const allowedOrigins = configService.get("CORS_ORIGINS")?.split(",") || [
        "http://localhost:3000",
    ];
    app.enableCors({
        origin: isProduction ? allowedOrigins : true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    });
    app.use((0, compression_1.default)());
    if (isProduction) {
        app.getHttpAdapter().getInstance().set("trust proxy", 1);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const reflector = app.get(core_1.Reflector);
    app.useGlobalInterceptors(new common_2.ResponseTransformInterceptor(reflector));
    app.useGlobalFilters(new common_2.HttpExceptionFilter());
    if (!isProduction) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle("Stock Management System API")
            .setDescription("API for Textile Manufacturing & Trading Stock Management")
            .setVersion("1.0")
            .addTag("auth", "Authentication endpoints")
            .addTag("masters", "Master data management")
            .addTag("production", "Production workflow")
            .addTag("inventory", "Stock tracking")
            .addTag("trading", "Sales operations")
            .addTag("finance", "Financial settlements")
            .addTag("health", "Health check endpoints")
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup("api/docs", app, document);
    }
    app.enableShutdownHooks();
    const logger = new common_1.Logger("Bootstrap");
    process.on("SIGTERM", async () => {
        logger.log("SIGTERM received, shutting down gracefully...");
        await app.close();
        process.exit(0);
    });
    process.on("SIGINT", async () => {
        logger.log("SIGINT received, shutting down gracefully...");
        await app.close();
        process.exit(0);
    });
    await app.listen(port);
    const pinoLogger = app.get(nestjs_pino_1.Logger);
    pinoLogger.log(`🚀 API running on http://localhost:${port}/api`);
    pinoLogger.log(`🌍 Environment: ${isProduction ? "production" : "development"}`);
    if (!isProduction) {
        pinoLogger.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map