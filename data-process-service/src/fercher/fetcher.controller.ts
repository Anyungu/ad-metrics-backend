import { Controller, Get, Post } from '@nestjs/common';
import { FetcherService } from './fetcher.service';

@Controller('webhook/fetcher')
export class FetcherController {
  constructor(private readonly fetcherService: FetcherService) {}

  @Get()
  async fetchDataWebhook() {
    return await this.fetcherService.fetchAndStoreData();
  }
}
