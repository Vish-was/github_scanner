import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import resolvers from "./resolvers.js";
import typeDefs from "./schemaGql.js";
import os from "os";
import cluster from "cluster";
import dotenv from "dotenv";

dotenv.config();
const cpuNum = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < cpuNum; i++) {
    if (i === 2) break;
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  server.listen().then(({ url }) => {
    console.log("server ready at", url);
  });
}
