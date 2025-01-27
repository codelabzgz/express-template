import { expect, test } from "vitest";

test("should fetch CSRF token from /auth/csrf", async () => {
  const response = await fetch("http://localhost:3000/auth/csrf");
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(data).toHaveProperty("csrfToken");
  expect(typeof data.csrfToken).toBe("string");
});
