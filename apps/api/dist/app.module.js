"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const nestjs_pino_1 = require("nestjs-pino");
const auth_1 = require("./modules/auth");
const quality_1 = require("./modules/masters/quality");
const health_1 = require("./modules/health");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [".env.local", ".env"],
                expandVariables: true,
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => [
                    {
                        name: "short",
                        ttl: 1000,
                        limit: configService.get("RATE_LIMIT_SHORT") || 10,
                    },
                    {
                        name: "medium",
                        ttl: 60000,
                        limit: configService.get("RATE_LIMIT_MEDIUM") || 100,
                    },
                    {
                        name: "long",
                        ttl: 3600000,
                        limit: configService.get("RATE_LIMIT_LONG") || 1000,
                    },
                ],
                inject: [config_1.ConfigService],
            }),
            nestjs_pino_1.LoggerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    pinoHttp: {
                        transport: configService.get("NODE_ENV") !== "production"
                            ? {
                                target: "pino-pretty",
                                options: {
                                    singleLine: true,
                                    colorize: true,
                                },
                            }
                            : undefined,
                        level: configService.get("NODE_ENV") !== "production" ? "debug" : "info",
                        redact: ["req.headers.authorization", "req.body.password", "req.body.refreshToken"],
                        autoLogging: {
                            ignore: (req) => req.url?.includes("/health") ?? false,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get("MONGODB_URI") || "mongodb://localhost:27017/stock-management",
                    retryAttempts: 5,
                    retryDelay: 3000,
                }),
                inject: [config_1.ConfigService],
            }),
            health_1.HealthModule,
            auth_1.AuthModule,
            quality_1.QualityModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map