import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import ModGenerate from './generate';

const QUEUE_NAME = 'default';

if (!process.env.REDIS_URL) console.warn('REDIS_URL not set!');
const connection = new Redis(process.env.REDIS_URL as string);

// const connection = {
//   host: process.env.REDIS_HOST,
// };

export const queue = new Queue(QUEUE_NAME, { connection });

export const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    if (job.name === 'generateSubmission') {
      console.log(`Generating submission`);
      const submission = await ModGenerate.submission();
      console.log(`Submission generated: ${submission}`);
    }
  },
  { connection }
);

type JobName = 'generateSubmission';

export const enqueue = async (job: JobName, data?: any) => {
  await queue.add(job, data);
};
