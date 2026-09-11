import Fastify from "fastify";
import mercurius from "mercurius";

import { schema } from "@/graphql/schema.js";
import { resolvers } from "@/graphql/resolvers.js";

const app = Fastify({
  logger: true,
});

await app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

try {
  await app.listen({
    port: 3000,
    host: "0.0.0.0",
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}