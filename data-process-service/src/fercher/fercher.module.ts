import { Module } from '@nestjs/common';
import { FetcherService } from './fetcher.service';
import { FetcherController } from './fetcher.controller';
import { ConfigModule } from '@nestjs/config';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [ConfigModule.forRoot(), MetricsModule],
  controllers: [FetcherController],
  providers: [FetcherService],
  exports: [FetcherService],
})
export class FercherModule {}
