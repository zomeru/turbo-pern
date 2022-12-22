import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import { times } from 'lodash';

import { db, enqueue } from '../utils';

export const resolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,

  Query: {
    hello: () => 'Hello Zoms!',
    submissions: async () => {
      console.log('submissions');
      const submissions = await db.submission.findMany();
      return submissions;
    },
  },

  Mutation: {
    queueSubmissionGeneration: async (_: any, { count }: { count: number }) => {
      try {
        await Promise.all(
          times(count || 1).map(async () => {
            await enqueue('generateSubmission');
          })
        );
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
