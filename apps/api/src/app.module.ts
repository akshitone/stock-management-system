import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

// Feature Modules
import { QualityModule } from "./modules/masters/quality";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    // MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>("MONGODB_URI") ||
          "mongodb://localhost:27017/stock-management",
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
