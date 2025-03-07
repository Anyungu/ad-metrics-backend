import { Controller, Post } from '@nestjs/common';
import { FetcherService } from './fetcher.service';

@Controller('webhook')
export class FetcherController {
  constructor(private readonly fetcherService: FetcherService) {}

  @Post()
  async fetchDataWebhook() {
    console.log(100);
    await this.fetcherService.fectAndEmitImpressionData();
    // return await this.fetcherService.fetchAndStoreData();
  }
}
