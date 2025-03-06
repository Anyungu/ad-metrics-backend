import { Gauge, register } from 'prom-client';

export const adImpressionsGauge = new Gauge({
  name: 'ad_impressions',
  help: 'Average daily ad impressions',
  labelNames: ['date'],
});

// register.clear();
register.registerMetric(adImpressionsGauge);
