import { Counter, Gauge, register } from 'prom-client';

export const adImpressionsGauge = new Gauge({
  name: 'ad_impressions',
  help: 'Average daily ad impressions',
  labelNames: ['date'],
});

export const adImpressionsCount = new Counter({
  name: 'ad_impressions_count',
  help: 'Total number of unique ad impressions time series',
});

// register.clear();
register.registerMetric(adImpressionsGauge);
register.registerMetric(adImpressionsCount);
