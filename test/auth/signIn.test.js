import { BadRequest, NotFound, Unauthorized } from '#api/lib/http.js'
import { signInValues } from '#test/mocks/users/index.js'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { cleanUsers } from '../utils'

describe.sequential('Authentication tests for /auth/sign-in', () => {
  beforeAll(async () => {
    await fetch(`${process.env.API_URL}/auth/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signInValues.validUser)
    })
  })

  // Here, we clean only the users that this suite uses/creates
  afterAll(async () => {
    await cleanUsers(signInValues)
  })

  test('Should log in successfully with valid credentials', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signInValues.validUser)
    })
    expect(response.status).toBe(200)
  })

  test('Should return 400 for missing or invalid data', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signInValues.invalidParams)
    })
    const { status } = await response.json()

    const badrequest = new BadRequest()
    expect(response.status).toBe(badrequest.httpCode)
    expect(status.error_code).toBe(badrequest.appErrorCode)
    expect(status.error_message).toBe('password required')
  })

  test('Should return 401 for incorrect credentials', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signInValues.invalidCredentials)
    })
    const { status } = await response.json()

    const unauthorized = new Unauthorized()
    expect(response.status).toBe(unauthorized.httpCode)
    expect(status.error_code).toBe(unauthorized.appErrorCode)
    expect(status.error_message).toBe(unauthorized.message)
  })

  test('Should return 404 if user does not exist', async () => {
    const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signInValues.nonExistentUser)
    })
    const { status } = await response.json()

    const notFound = new NotFound()
    expect(response.status).toBe(notFound.httpCode)
    expect(status.error_code).toBe(notFound.appErrorCode)
    expect(status.error_message).toBe(notFound.message)
  })
})
