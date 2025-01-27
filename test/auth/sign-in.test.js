import { expect, test } from "vitest";

const credentials = {
  username: "johndoe",
  password: "12345678",
  csrf: "...",
};

test("should fetch CSRF token from /auth/csrf", async () => {
  const response = await fetch(
    "http://localhost:3000/auth/sign-in/credentials",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  );
  expect(response.status).toBe(200);
});
