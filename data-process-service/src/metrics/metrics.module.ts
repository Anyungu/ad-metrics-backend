import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsController } from './metrics.controller';
import { adImpressionsGauge } from '../utils/metrics';

export const PROM_METRIC_AD_IMPRESSIONS = 'ad_impressions';
@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: false,
      },
    }),
  ],
  exports: [PROM_METRIC_AD_IMPRESSIONS],
  controllers: [MetricsController],
  providers: [
    {
      provide: PROM_METRIC_AD_IMPRESSIONS,
      useValue: adImpressionsGauge,
    },
  ],
})
export class MetricsModule {}
