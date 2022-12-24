import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

export const genId = () => nanoid(16);

export const db = new PrismaClient({
  log: ['error', 'query', 'info', 'warn'],
});

// export const seedDatabase = async () => {
//   const submissionCount = await db.submission.count();

//   if (submissionCount === 0) {
//     console.log('Seeding database...');
//     await db.submission.create({
//       data: {
//         id: nanoid(16),
//         submittedAt: new Date(),
//         data: {
//           name: 'Zomer',
//         },
//       },
//     });
//     console.log('Database seeded.');
//   }
// };
