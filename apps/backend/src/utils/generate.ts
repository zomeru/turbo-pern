import { faker } from '@faker-js/faker';
import { db, genId } from './database';

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const submission = async () => {
  return await db.submission.create({
    data: {
      id: genId(),
      submittedAt: new Date(),
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        company: faker.company.name(),
        comments: faker.lorem.words(random(5, 30)),
      },
    },
  });
};

const ModGenerate = {
  submission,
};

export default ModGenerate;
