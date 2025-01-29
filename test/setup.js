import { db } from '#db/index.js'
import { users } from '#db/schemas/users.js'
import { afterAll, beforeAll } from 'vitest'

beforeAll(async () => {
  await db.delete(users)
})

afterAll(async () => {
  await db.delete(users)
})
