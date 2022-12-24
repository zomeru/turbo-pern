import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { json } from 'body-parser';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';

import { typeDefs, resolvers } from './graphql';
// import { seedDatabase } from './utils';

const main = async () => {
  const app = express();

  // seedDatabase();

  app.use(morgan('dev'));

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
    // expressMiddleware(server, {
    //   context: async () => {
    //     return {
    //       db,
    //     };
    //   },
    // })
  );

  const port = Number(process.env.PORT) || 8080;
  const host = '0.0.0.0';

  await new Promise<void>((resolve) =>
    httpServer.listen({ host, port }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};

main();
