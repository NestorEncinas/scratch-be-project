import "reflect-metadata";
import { importSchema } from "graphql-import";
import config from "../../ormconfig";
import { photoResolver } from "./resolvers/Photo";

/**
 * graphQLServer - graphql-yoga || https://github.com/prisma/graphql-yoga/issues/382
 * 
import { GraphQLServer } from "graphql-yoga";
*/

import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";

/**
 * GraphQLSERVER - graphql-yoga || https://github.com/prisma/graphql-yoga#usage
 *  */

// console.log(importSchema("schema.graphql"));
const typeDefs = importSchema("./src/schema.graphql");

// const server = new GraphQLServer({ typeDefs, resolvers });
// server.start(() => console.log("Server is running on localhost:4000"));

// const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ typeDefs, resolvers: [photoResolver] });

/**
 * https://typeorm.io/#/connection
 *
 * ormconfig.json is enough?
 */
createConnection(config)
  .then(() => {
    server
      .listen()
      .then(({ url }) => {
        console.log(`Apollo Server ready at ${url}`);
      })
      .catch(error => {
        console.log("Apollo server error", error);
      });
  })
  .catch(error => {
    console.log("TypeOrm create connection to database failed", error);
  });

// createConnection(config);
