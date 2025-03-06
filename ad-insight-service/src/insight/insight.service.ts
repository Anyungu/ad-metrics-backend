import { Injectable } from '@nestjs/common';
import { InsightResponse } from 'src/models/graphql-types';

@Injectable()
export class InsightService {
  getAdInsights(): InsightResponse {
    return {
      data: [
        {
          impressions: '1741',
          date_start: '2016-03-11',
          date_stop: '2016-03-12',
        },
      ],
      paging: {
        cursors: {
          before: 'MAZDZD',
          after: 'MAZDZD',
        },
      },
    };
  }
}
