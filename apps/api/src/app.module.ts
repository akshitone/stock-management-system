import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { LoggerModule } from "nestjs-pino";

// Feature Modules
import { AuthModule } from "./modules/auth";
import { QualityModule } from "./modules/masters/quality";
import { HealthModule } from "./modules/health";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
      expandVariables: true,
    }),

    // Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          name: "short",
          ttl: 1000, // 1 second
          limit: configService.get<number>("RATE_LIMIT_SHORT") || 10,
        },
        {
          name: "medium",
          ttl: 60000, // 1 minute
          limit: configService.get<number>("RATE_LIMIT_MEDIUM") || 100,
        },
        {
          name: "long",
          ttl: 3600000, // 1 hour
          limit: configService.get<number>("RATE_LIMIT_LONG") || 1000,
        },
      ],
      inject: [ConfigService],
    }),

    // Pino Logger
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          transport:
            configService.get<string>("NODE_ENV") !== "production"
              ? {
                  target: "pino-pretty",
                  options: {
                    singleLine: true,
                    colorize: true,
                  },
                }
              : undefined,
          level: configService.get<string>("NODE_ENV") !== "production" ? "debug" : "info",
          // Don't log sensitive data
          redact: ["req.headers.authorization", "req.body.password", "req.body.refreshToken"],
          // Don't log health check endpoints
          autoLogging: {
            ignore: (req) => req.url?.includes("/health") ?? false,
          },
        },
      }),
      inject: [ConfigService],
    }),

    // MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>("MONGODB_URI") || "mongodb://localhost:27017/stock-management",
        // Production-ready connection options
        retryAttempts: 5,
        retryDelay: 3000,
      }),
      inject: [ConfigService],
    }),

    // Health Check Module
    HealthModule,

    // Feature Modules
    AuthModule,
    QualityModule,
  ],
  controllers: [],
  providers: [
    // Global Rate Limiting Guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
