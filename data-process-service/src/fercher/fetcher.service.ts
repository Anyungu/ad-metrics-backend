import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { addDays, differenceInDays, format, parseISO } from 'date-fns';
import { GraphQLClient, gql } from 'graphql-request';
import { Gauge } from 'prom-client';
import { InsightResponse } from 'src/models/graphql-types';

@Injectable()
export class FetcherService {
  private readonly logger = new Logger(FetcherService.name);
  private readonly gqlClient: GraphQLClient;

  constructor(
    @Inject('ad_impressions') private readonly gauge: Gauge<string>,
    private configService: ConfigService,
  ) {
    const insightsBaseUrl = this.configService.get<string>('INSIGHTS_BASE_URL');
    if (!insightsBaseUrl) {
      throw new Error('INSIGHTS_BASE_URL is not defined in the configuration.');
    }
    this.gqlClient = new GraphQLClient(insightsBaseUrl);
    this.gauge = gauge;
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
        const avgDailyImpressions = Number(insight.impressions) / daysCount;
        // stor each as a daily average
        for (let i = 0; i < daysCount; i++) {
          const currentDate = format(addDays(startDate, i), 'yyyy-MM-dd');
          this.gauge.set({ date: currentDate }, avgDailyImpressions);
        }
      });

      this.logger.log(`Fetched & stored ${insights.length} ad insights.`);
    } catch (error) {
      this.logger.error('Error fetching GraphQL data:', error);
    }
  }
}
