import { Unauthorized } from '#api/lib/http.js'
import { describe, expect, it } from 'vitest'

const loginAndGetToken = async () => {
  const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'johndoe@example.com', password: '12345678' })
  })
  const data = await response.json()
  return data.token || ''
}

describe('User logout tests for /auth/sign-out', () => {
  it('Should log out successfully with a valid session', async () => {
    const token = await loginAndGetToken()
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
    const { status } = await response.json()

    const unauthorized = new Unauthorized()
    expect(response.status).toBe(unauthorized.httpCode)
    expect(status.error_code).toBe(unauthorized.appErrorCode)
    expect(status.error_message).toBe(unauthorized.message)
  })
})
