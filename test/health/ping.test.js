import { expect, test } from "vitest";

test("/health/ping", async () => {
  const response = await fetch("http://localhost:3000/health/ping");
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(data).toHaveProperty("health");
  expect(typeof data.health).toBe("string");
});
