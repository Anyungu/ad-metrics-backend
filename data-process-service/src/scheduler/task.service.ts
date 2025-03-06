import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FetcherService } from 'src/fercher/fetcher.service';

@Injectable()
export class TaskService {
  private readonly logger: Logger = new Logger(TaskService.name);
  constructor(private readonly fetcherService: FetcherService) {}

  // faster times for clean testing
  @Cron('15 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 20');
    void this.fetcherService.fetchAndStoreData();
  }
}
