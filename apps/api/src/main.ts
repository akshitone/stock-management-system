import { NestFactory, Reflector } from "@nestjs/core";
import { ValidationPipe, Logger, VersioningType } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { Logger as PinoLogger } from "nestjs-pino";
import helmet from "helmet";
import compression from "compression";
import { AppModule } from "./app.module";
import { HttpExceptionFilter, ResponseTransformInterceptor } from "./common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  const isProduction = configService.get<string>("NODE_ENV") === "production";
  const port = configService.get<number>("PORT") || 4000;

  // Use Pino logger
  app.useLogger(app.get(PinoLogger));

  // Global prefix
  app.setGlobalPrefix("api");

  // API Versioning (optional, but recommended for production)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  // ============================================
  // SECURITY CONFIGURATION
  // ============================================

  // Helmet - Security HTTP headers
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginEmbedderPolicy: isProduction,
    })
  );

  // CORS - Cross-Origin Resource Sharing
  const allowedOrigins = configService.get<string>("CORS_ORIGINS")?.split(",") || [
    "http://localhost:3000",
  ];

  app.enableCors({
    origin: isProduction ? allowedOrigins : true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  });

  // Compression - Gzip responses
  app.use(compression());

  // Trust proxy (for rate limiting behind reverse proxy)
  if (isProduction) {
    app.getHttpAdapter().getInstance().set("trust proxy", 1);
  }

  // ============================================
  // GLOBAL PIPES, FILTERS, INTERCEPTORS
  // ============================================

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Response interceptor (for unified success responses)
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseTransformInterceptor(reflector));

  // Exception filter (for unified error responses)
  app.useGlobalFilters(new HttpExceptionFilter());

  // ============================================
  // SWAGGER DOCUMENTATION (disabled in production)
  // ============================================
  if (!isProduction) {
    const config = new DocumentBuilder()
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

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
  }

  // ============================================
  // GRACEFUL SHUTDOWN
  // ============================================
  app.enableShutdownHooks();

  // Handle shutdown signals
  const logger = new Logger("Bootstrap");

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

  // ============================================
  // START SERVER
  // ============================================
  await app.listen(port);

  const pinoLogger = app.get(PinoLogger);
  pinoLogger.log(`🚀 API running on http://localhost:${port}/api`);
  pinoLogger.log(`🌍 Environment: ${isProduction ? "production" : "development"}`);

  if (!isProduction) {
    pinoLogger.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
  }
}

bootstrap();
