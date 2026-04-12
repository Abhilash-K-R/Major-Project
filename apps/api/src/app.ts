import Fastify from "fastify";
import cors from "@fastify/cors";
import { env } from "./config/env.js";
import { registerRoutes } from "./routes/index.js";

export async function buildApp() {
  const app = Fastify({
    logger: true
  });

  await app.register(cors, {
    origin: env.WEB_ORIGIN
  });

  await app.register(async (instance) => {
    await registerRoutes(instance);
  }, { prefix: env.API_PREFIX });

  return app;
}
