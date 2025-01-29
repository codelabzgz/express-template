import { Unauthorized } from '#api/lib/http.js'
import { db } from '#db/index.js'
import { users } from '#db/schemas/users.js'
import { validUser } from '#test/mocks/users/index.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

async function loginAndGetToken () {
  await fetch(`${process.env.API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validUser)
  })
  const { data } = await fetch(`${process.env.API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validUser)
  }).then(res => res.json())
  return data.token
}

describe('User logout tests for /auth/sign-out', () => {
  let token = null

  beforeAll(async () => {
    token = await loginAndGetToken()
  })

  afterAll(async () => {
    await db.delete(users)
  })

  it('Should log out successfully with a valid session', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-out`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    expect(response.status).toBe(200)
  })

  it('Should return 401 if no authentication token is provided or is invalid or expired', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-out`, { method: 'POST' })

    const unauthorized = new Unauthorized()
    expect(response.status).toBe(unauthorized.httpCode)
  })
})
