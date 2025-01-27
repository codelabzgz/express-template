import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { accounts } from "./schemas/accounts";
import { authenticators } from "./schemas/authenticators";
import { sessions } from "./schemas/sessions";
import { users } from "./schemas/users";
import { verificationTokens } from "./schemas/verificationTokens";

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
