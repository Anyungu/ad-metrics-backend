import { Module } from '@nestjs/common';
import { FetcherService } from './fetcher.service';
import { FetcherController } from './fetcher.controller';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  controllers: [FetcherController],
  providers: [
    FetcherService,
    makeCounterProvider({
      name: 'ad_impressions_total',
      help: 'Total ad impressions fetched from GraphQL',
    }),
  ],
})
export class FercherModule {}
