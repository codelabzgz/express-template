import { BadRequest, NotFound, Unauthorized } from '#api/lib/http.js'
import { db } from '#db/index.js'
import { users } from '#db/schemas/users.js'
import { invalidCredentials, invalidParams, nonExistentUser, validUser } from '#test/mocks/users/index.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authentication tests for /auth/sign-in', () => {
  beforeAll(async () => {
    await fetch(`${process.env.API_URL}/auth/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validUser)
    })
  })

  afterAll(async () => {
    await db.delete(users)
  })

  it('Should log in successfully with valid credentials', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validUser)
    })
    expect(response.status).toBe(200)
  })

  it('Should return 400 for missing or invalid data', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidParams)
    })
    const { status } = await response.json()

    const badrequest = new BadRequest()
    expect(response.status).toBe(badrequest.httpCode)
    expect(status.error_code).toBe(badrequest.appErrorCode)
    expect(status.error_message).toBe('password required')
  })

  it('Should return 401 for incorrect credentials', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidCredentials)
    })
    const { status } = await response.json()

    const unauthorized = new Unauthorized()
    expect(response.status).toBe(unauthorized.httpCode)
    expect(status.error_code).toBe(unauthorized.appErrorCode)
    expect(status.error_message).toBe(unauthorized.message)
  })

  it('Should return 404 if user does not exist', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nonExistentUser)
    })
    const { status } = await response.json()

    const notFound = new NotFound()
    expect(response.status).toBe(notFound.httpCode)
    expect(status.error_code).toBe(notFound.appErrorCode)
    expect(status.error_message).toBe(notFound.message)
  })
})
