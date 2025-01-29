/**
 * 📌 Test Setup: Cleaning the Database Before Running Tests
 *
 * This script runs before all tests using Vitest's `beforeAll` hook.
 * Its purpose is to clean the database by deleting all records from the `users` collection.
 *
 * 🔹 Why is this needed?
 * - Ensures a clean test environment for each test suite.
 * - Prevents data conflicts between tests.
 * - Improves test reliability by avoiding dependencies on previous test data.
 *
 * 🛠️ How it works:
 * 1. Logs a message indicating the cleanup process has started.
 * 2. Deletes all records from the `users` collection using `db.delete(users)`.
 * 3. Logs a confirmation message once the cleanup is complete.
 */

import { db } from '#db/index.js'
import { users } from '#db/schemas/users.js'
import { afterAll, beforeAll } from 'vitest'

beforeAll(async () => {
  console.log('🔄 Cleaning test environment...')
  await db.delete(users)
  console.log('✅ Test environment cleaned')
})

afterAll(async () => {
  console.log('🔄 Cleaning test environment...')
  await db.delete(users)
  console.log('✅ Test environment cleaned')
})
