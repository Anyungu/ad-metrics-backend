import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InsightResponse } from 'src/models/graphql-types';

@Injectable()
export class InsightService {
  getAdInsights(): InsightResponse {
    const startDate = faker.date.between({
      from: new Date(new Date().getFullYear(), 0, 1),
      to: new Date(new Date().getFullYear(), 2, 31),
    });
    const daysToAdd = faker.number.int({ min: 0, max: 4 });
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + daysToAdd);

    return {
      data: [
        {
          impressions: faker.number.int({ min: 3, max: 10433 }).toString(),
          date_start: startDate.toISOString().split('T')[0],
          date_stop: endDate.toISOString().split('T')[0],
        },
      ],
      paging: {
        cursors: {
          before: faker.string.alphanumeric(6),
          after: faker.string.alphanumeric(6),
        },
      },
    };
  }
}
