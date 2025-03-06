import { Module } from '@nestjs/common';
import { FetcherService } from './fetcher.service';
import { FetcherController } from './fetcher.controller';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  controllers: [FetcherController],
  providers: [
    FetcherService,
    makeCounterProvider({
      name: 'ad_impressions',
      help: 'ad impressions fetched from GraphQL',
    }),
  ],
  exports: [FetcherService],
})
export class FercherModule {}
