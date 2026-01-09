import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "nestjs-pino";

// Feature Modules
import { QualityModule } from "./modules/masters/quality";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
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
          redact: ["req.headers.authorization", "req.body.password"],
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
      }),
      inject: [ConfigService],
    }),

    // Feature Modules
    QualityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
