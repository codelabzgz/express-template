import { BadRequest, Conflict } from '#api/lib/http.js'
import { invalidUser, validUser } from '#test/mocks/users/index.js'
import { describe, expect, it } from 'vitest'

describe('User registration tests for /auth/sign-up', () => {
  it('Should create a new user successfully', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validUser)
    })
    expect(response.status).toBe(201)
  })

  it('Should return 409 if user already exists', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validUser)
    })
    const { status } = await response.json()

    const conflict = new Conflict()
    expect(response.status).toBe(conflict.httpCode)
    expect(status.error_code).toBe(conflict.appErrorCode)
    expect(status.error_message).toBe(conflict.message)
  })

  it('Should return 400 for missing or invalid data', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidUser)
    })
    const { status } = await response.json()

    const badrequest = new BadRequest()
    expect(response.status).toBe(badrequest.httpCode)
    expect(status.error_code).toBe(badrequest.appErrorCode)
    expect(status.error_message).toBe('email with invalid format')
  })
})
