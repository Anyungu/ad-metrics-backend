import { Controller, Post } from '@nestjs/common';
import { FetcherService } from './fetcher.service';

@Controller('webhook/fetcher')
export class FetcherController {
  constructor(private readonly fetcherService: FetcherService) {}

  @Post()
  async fetchDataWebhook() {
    return await this.fetcherService.fetchAndStoreData();
  }
}
