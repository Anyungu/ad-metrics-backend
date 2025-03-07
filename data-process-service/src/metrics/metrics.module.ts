import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsController } from './metrics.controller';
import { adImpressionsCount, adImpressionsGauge } from '../utils/metrics';

export const PROM_METRIC_AD_IMPRESSIONS = 'ad_impressions';
export const PROM_METRIC_AD_IMPRESSIONS_COUNT = 'ad_impressions_count';
@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: false,
      },
    }),
  ],
  exports: [PROM_METRIC_AD_IMPRESSIONS, PROM_METRIC_AD_IMPRESSIONS_COUNT],
  controllers: [MetricsController],
  providers: [
    {
      provide: PROM_METRIC_AD_IMPRESSIONS,
      useValue: adImpressionsGauge,
    },
    {
      provide: PROM_METRIC_AD_IMPRESSIONS_COUNT,
      useValue: adImpressionsCount,
    },
  ],
})
export class MetricsModule {}
