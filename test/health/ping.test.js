import { expect, test } from 'vitest'

test('/health/ping', async () => {
  const response = await fetch(`${process.env.API_URL}/health/ping`)
  expect(response.status).toBe(200)
})
