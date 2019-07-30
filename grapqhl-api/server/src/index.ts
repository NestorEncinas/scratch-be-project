import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { createConnection } from "typeorm";

import { photoResolver } from "./resolvers/Photo";
import config from "../../ormconfig";

/**
 * TypeDefs - describes the types/query/mutation/subscribers of the schema
 *
 *  Note: TypeGraphql replaces it using buildSchema
 */
const typeDefs = importSchema("./server/src/schema.graphql");

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers: [photoResolver]
});

server.applyMiddleware({ app, path: "/graphql" });

createConnection(config).then(() => {
  app.listen({ port: 4000 }, () => {
    console.log("Apollo Server on http://localhost:4000/graphql");
  });
});
