import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "#db/index.js";
import Credentials from "@auth/express/providers/credentials";
import GitHub from "@auth/express/providers/github";

export const authConfig = {
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        console.log("credentials: ", user);

        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password);

        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email, pwHash);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        console.log("Logged in", user);

        // return user object with their profile data
        return user;
      },
    }),
    GitHub,
  ],
  adapter: DrizzleAdapter(db),
};
