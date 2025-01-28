import { generateUsers } from "#db/seeds/users.js";

export const users = Array.from({ length: 5 }, generateUsers);
