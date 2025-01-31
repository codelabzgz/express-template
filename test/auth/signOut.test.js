import { Unauthorized } from '#api/lib/http.js'
import { signOutValues } from '#test/mocks/users/index.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { cleanUsers } from '../utils'

async function loginAndGetToken () {
  await fetch(`${process.env.API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signOutValues.validUser)
  })
  const { data } = await fetch(`${process.env.API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signOutValues.validUser)
  }).then(res => res.json())
  return data.token
}

describe.sequential('User logout tests for /auth/sign-out', () => {
  let token = null

  beforeAll(async () => {
    token = await loginAndGetToken()
  })

  // Here, we clean only the users that this suite uses/creates
  afterAll(async () => {
    await cleanUsers(signOutValues)
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
