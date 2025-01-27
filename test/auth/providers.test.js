import { expect, test } from "vitest";

test("should fetch CSRF token from /auth/csrf", async () => {
  const response = await fetch("http://localhost:3000/auth/providers");
  expect(response.status).toBe(200);
});
