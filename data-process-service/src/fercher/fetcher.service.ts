import { Injectable, Logger } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { GraphQLClient, gql } from 'graphql-request';
import { Counter } from 'prom-client';

@Injectable()
export class FetcherService {
  private readonly logger = new Logger(FetcherService.name);
  private readonly gqlClient: GraphQLClient;
  private readonly counter: Counter<string>;

  constructor(@InjectMetric('ad_impressions_total') counter: Counter<string>) {
    this.gqlClient = new GraphQLClient('http://127.0.0.1:3001/graphql');
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
      const response: any = await this.gqlClient.request(query);
      const insights = response.getAdInsights.data;

      console.log(insights);

      insights.forEach((insight: any) => {
        this.counter.inc(Number(insight.impressions));
      });

      this.logger.log(`Fetched & stored ${insights.length} ad insights.`);
    } catch (error) {
      this.logger.error('Error fetching GraphQL data:', error);
    }
  }
}
