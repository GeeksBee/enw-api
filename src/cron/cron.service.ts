import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';

import { RegisterJobOptions } from './interfaces';

@Injectable()
export class CronService {
  private jobs = new Map<string, CronJob>();

  public getJob(name: string): CronJob {
    return this.jobs.get(name);
  }

  public registerJob({
    name,
    context,
    cronTime,
    onTick,
  }: RegisterJobOptions): CronJob {
    if (this.getJob(name)) {
      throw new Error('a cron with this name is already regstered');
    }
    const job = new CronJob({
      context,
      cronTime,
      onTick,
    });

    this.jobs.set(name, job);

    job.start();

    return job;
  }
}
