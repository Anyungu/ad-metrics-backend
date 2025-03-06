import { Resolver, Query } from '@nestjs/graphql';
import { InsightService } from './insight.service';
import { InsightResponse } from '@workspace/shared-types';

// Acting controller
@Resolver()
export class InsightResolver {
  constructor(private readonly insightService: InsightService) {}

  @Query(() => InsightResponse)
  getAdInsights(): InsightResponse {
    return this.insightService.getAdInsights();
  }
}
