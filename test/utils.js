import { db } from '#db/index.js'
import { users } from '#db/schemas/users.js'
import { inArray } from 'drizzle-orm'
/**
 * Remove users given by object. Each key should contain an
 * object with information about an user. See 'mocks/users.js' for
 * an example of an object
 *
 * @param {users} userData the user data. Must contain at least the email
 * to uniquely identify users.
 */
export async function cleanUsers (userData) {
  // extract all distinct emails
  const emails = Object.values(userData)
    .map((entry) => entry.email)
    .filter((email, index, self) => email && self.indexOf(email) === index)

  if (emails.length === 0) {
    return
  }

  // try to delete all the emails from the user object
  try {
    const result = await db
      .delete(users)
      .where(inArray(users.email, emails))
      .returning({ email: users.email })

    console.log('Deleted users:', result)

    return result
  } catch (error) {
    console.error('Error deleting users:', error)
  }
}
