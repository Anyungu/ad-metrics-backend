import { Module } from '@nestjs/common';
import { FercherModule } from './fercher/fercher.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [FercherModule, SchedulerModule, MetricsModule],
})
export class AppModule {}
