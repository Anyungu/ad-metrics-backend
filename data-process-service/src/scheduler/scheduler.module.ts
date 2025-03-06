import { Module } from '@nestjs/common';
import { FercherModule } from 'src/fercher/fercher.module';
import { TaskService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [FercherModule, ScheduleModule.forRoot()],
  providers: [TaskService],
})
export class SchedulerModule {}
