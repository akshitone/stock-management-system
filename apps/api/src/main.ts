import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Use Pino logger
  app.useLogger(app.get(Logger));

  // Global prefix
  app.setGlobalPrefix("api");

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  // Swagger configuration
  const config = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  const logger = app.get(Logger);
  logger.log(`🚀 API running on http://localhost:${port}/api`);
  logger.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
