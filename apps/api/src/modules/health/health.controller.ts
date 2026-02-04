import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator
  ) {}

  /**
   * Liveness probe - checks if the application is running
   * Used by Kubernetes/Docker to determine if container should be restarted
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }

  /**
   * Readiness probe - checks if the application is ready to receive traffic
   * Checks MongoDB connection, memory usage, and disk space
   */
  @Get("ready")
  @HealthCheck()
  checkReady() {
    return this.health.check([
      // MongoDB connection check
      () => this.mongoose.pingCheck("mongodb"),

      // Memory heap check (max 300MB)
      () => this.memory.checkHeap("memory_heap", 300 * 1024 * 1024),

      // Memory RSS check (max 500MB)
      () => this.memory.checkRSS("memory_rss", 500 * 1024 * 1024),

      // Disk storage check (max 90% used)
      () =>
        this.disk.checkStorage("disk", {
          path: process.platform === "win32" ? "C:\\" : "/",
          thresholdPercent: 0.9,
        }),
    ]);
  }
}
