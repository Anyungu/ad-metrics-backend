import { Module } from '@nestjs/common';
import { FercherModule } from './fercher/fercher.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { MetricsModule } from './metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './scheduler/task.service';

@Module({
  imports: [
    FercherModule,
    SchedulerModule,
    MetricsModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  providers: [TaskService],
})
export class AppModule {}
