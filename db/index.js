import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { accounts } from "#db/schemas/accounts.js";
import { authenticators } from "#db/schemas/authenticators.js";
import { sessions } from "#db/schemas/sessions.js";
import { users } from "#db/schemas/users.js";
import { verificationTokens } from "#db/schemas/verificationTokens.js";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle({
  client,
  schema: {
    ...accounts,
    ...authenticators,
    ...sessions,
    ...users,
    ...verificationTokens,
  },
});
