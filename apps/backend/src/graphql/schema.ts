import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime
  scalar JSON

  type Query {
    hello: String!
    submissions: [Submission!]!
  }

  type Mutation {
    queueSubmissionGeneration(count: Int): Boolean!
  }

  type Submission {
    id: ID!
    submittedAt: DateTime!
    data: JSON!
  }
`;
