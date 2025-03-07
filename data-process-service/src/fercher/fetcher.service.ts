import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { addDays, differenceInDays, format, parseISO } from 'date-fns';
import { GraphQLClient, gql } from 'graphql-request';
import { Counter, Gauge } from 'prom-client';
import { EventsGateway } from '../live/events.gateway';
import {
  PROM_METRIC_AD_IMPRESSIONS,
  PROM_METRIC_AD_IMPRESSIONS_COUNT,
} from 'src/metrics/metrics.module';
import { InsightResponse } from 'src/models/graphql-types';

@Injectable()
export class FetcherService {
  private readonly logger = new Logger(FetcherService.name);
  private readonly gqlClient: GraphQLClient;

  constructor(
    @Inject(PROM_METRIC_AD_IMPRESSIONS) private readonly gauge: Gauge<string>,
    @Inject(PROM_METRIC_AD_IMPRESSIONS_COUNT)
    private readonly counter: Counter<string>,
    private readonly configService: ConfigService,
    private readonly eventsGateway: EventsGateway,
  ) {
    const insightsBaseUrl = this.configService.get<string>('INSIGHTS_BASE_URL');
    if (!insightsBaseUrl) {
      throw new Error('INSIGHTS_BASE_URL is not defined in the configuration.');
    }
    this.gqlClient = new GraphQLClient(insightsBaseUrl);
    this.gauge = gauge;
    this.counter = counter;
  }

  async fetchAndStoreData() {
    const query = gql`
      query {
        getAdInsights {
          data {
            impressions
            date_start
            date_stop
          }
        }
      }
    `;

    try {
      const response = await this.gqlClient.request<{
        getAdInsights: InsightResponse;
      }>(query);

      const insights = response.getAdInsights.data;

      // estimate date average!
      insights.forEach((insight) => {
        const startDate = parseISO(insight.date_start);
        const endDate = parseISO(insight.date_stop);
        const daysCount = differenceInDays(endDate, startDate) + 1;
        const totalImpressions = Number(insight.impressions);

        const weights = Array.from({ length: daysCount }, () => Math.random());
        const weightSum = weights.reduce((sum, w) => sum + w, 0);

        const dailyImpressions = weights.map((w) =>
          Math.round((w / weightSum) * totalImpressions),
        );

        // stor each reando daily value
        for (let i = 0; i < dailyImpressions.length; i++) {
          const currentDate = format(addDays(startDate, i), 'yyyy-MM-dd');
          this.gauge.set({ date: currentDate }, dailyImpressions[i]);
          this.counter.inc();
        }
      });

      this.logger.log(`Fetched & stored ${insights.length} ad insights.`);
    } catch (error) {
      this.logger.error('Error fetching GraphQL data:', error);
    }
  }

  async fectAndEmitImpressionData() {
    try {
      const queries = [`sum(ad_impressions) by (date)`, `sum(ad_impressions)`];

      const responses = await Promise.all(
        queries.map((query) =>
          fetch(
            `http://prometheus:9090/api/v1/query?query=${encodeURIComponent(query)}`,
          ),
        ),
      );

      if (!responses.every((res) => res.ok))
        throw new Error('Failed to fetch data');
      const results = await Promise.all(responses.map((res) => res.json()));

      const impressions = results[0].data.result.map((entry: any) => ({
        date: entry.metric.date,
        impressions: parseFloat(entry.value[1]),
      }));

      const totalImpressions = {
        date: '',
        impressions: results[1].data.result[0]?.value[1],
      };

      console.log(totalImpressions);

      this.eventsGateway.emitEvent(`impressions`, JSON.stringify(impressions));

      this.eventsGateway.emitEvent(
        `total_impressions`,
        JSON.stringify(totalImpressions),
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
