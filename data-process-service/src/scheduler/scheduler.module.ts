import { Module } from '@nestjs/common';
import { FercherModule } from 'src/fercher/fercher.module';

@Module({
  imports: [FercherModule],
})
export class SchedulerModule {}
