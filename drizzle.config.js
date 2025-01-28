import { defineConfig } from "drizzle-kit";
import "@dotenvx/dotenvx/config";

export default defineConfig({
  dialect: "turso",
  schema: "./db/schemas/*.js",
  out: "./db/drizzle",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
  strict: true,
  verbose: true,
});
