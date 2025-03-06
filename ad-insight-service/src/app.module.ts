import { Module } from '@nestjs/common';
import { InsightModule } from './insight/insight.module';

@Module({
  imports: [InsightModule],
})
export class AppModule {}
