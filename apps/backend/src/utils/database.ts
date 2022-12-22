import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

export const genId = () => nanoid(16);

export const db = new PrismaClient({
  log: ['error', 'query', 'info', 'warn'],
});

export const seedDatabase = async () => {
  const submissionCount = await db.submission.count();

  if (submissionCount === 0) {
    console.log('Seeding database...');
    await db.submission.createMany({
      data: [
        {
          id: genId(),
          submittedAt: new Date(),
          data: {
            name: 'Zomer',
            twitter: 'zomeru',
          },
        },
        {
          id: genId(),
          submittedAt: new Date(),
          data: {
            name: 'John Doe',
            twitter: 'john_doe',
          },
        },
      ],
    });
    console.log('Database seeded.');
  }
};
