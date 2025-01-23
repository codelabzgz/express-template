import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { accounts } from "@db/schemas/accounts";
import { authenticators } from "@db/schemas/authenticators";
import { sessions } from "@db/schemas/sessions";
import { users } from "@db/schemas/users";
import { verificationTokens } from "@db/schemas/verificationTokens";

const client = createClient({
  connection: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
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
