// Importaciones necesarias
import { createToken } from '#api/lib/jwt.js'
import { db } from '#db/index.js'
import { users } from '#db/schemas/users.js'
import { pbkdf2Sync, randomBytes } from 'crypto'
import { eq } from 'drizzle-orm'

const HASH_CONFIG = {
  iterations: 100000,
  keyLength: 64,
  digest: 'sha512'
}

const COOKIE_OPTIONS = {
  signed: true,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 1 * 60 * 60 * 1000
}

function handleDatabaseError (err, res) {
  if (err.code === 'SQLITE_CONSTRAINT') {
    return res.status(409).send()
  } else {
    return res.status(500).send()
  }
}

export async function signUp (req, res) {
  const { email, password } = req.body

  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, HASH_CONFIG.iterations, HASH_CONFIG.keyLength, HASH_CONFIG.digest).toString('hex')

  try {
    await db.insert(users).values({ email, salt, password: hash })
    return res.status(201).send()
  } catch (err) {
    return handleDatabaseError(err, res)
  }
}

export async function signIn (req, res) {
  const { email, password } = req.body

  try {
    const [user] = await db
      .select({ id: users.id, salt: users.salt, password: users.password })
      .from(users)
      .where(eq(users.email, email))

    if (!user) return res.status(404).send()

    const hash = pbkdf2Sync(password, user.salt, HASH_CONFIG.iterations, HASH_CONFIG.keyLength, HASH_CONFIG.digest).toString('hex')

    if (hash !== user.password) return res.status(401).send()

    const token = await createToken({ id: user.id, email: user.email })

    res.cookie('session-token', token, COOKIE_OPTIONS)
    return res.status(200).send({ token })
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function signOut (req, res) {
  return res.clearCookie('session-token').send()
}
