import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { typeDefs, resolvers } from './graphql/schema.js';
import { authenticate } from './middleware/auth.js';

dotenv.config();

const startServer = async () => {
  await connectDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authenticate
  });
  const { url } = await server.listen({ port: process.env.PORT });
  console.log(`🩺 Servicio listo en ${url}`);
};

startServer();
