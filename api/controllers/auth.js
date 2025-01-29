import { Conflict, InternalServer, NotFound, sendResponse, Unauthorized } from '#api/lib/http.js'
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

export async function signUp (req, res, next) {
  const { email, password } = req.body

  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, HASH_CONFIG.iterations, HASH_CONFIG.keyLength, HASH_CONFIG.digest).toString('hex')

  return await db.insert(users).values({ email, salt, password: hash })
    .then(() => {
      return sendResponse(req, res, { status: { httpCode: 201 } })
    }).catch(err => {
      if (err.code === 'SQLITE_CONSTRAINT') return next(new Conflict())
      else return next(new InternalServer())
    })
}

export async function signIn (req, res, next) {
  const { email, password } = req.body

  const [user] = await db
    .select({ id: users.id, salt: users.salt, password: users.password })
    .from(users)
    .where(eq(users.email, email))

  if (!user) return next(new NotFound())

  const hash = pbkdf2Sync(password, user.salt, HASH_CONFIG.iterations, HASH_CONFIG.keyLength, HASH_CONFIG.digest).toString('hex')

  if (hash !== user.password) return next(new Unauthorized())

  const token = await createToken({ id: user.id, email: user.email })

  res.cookie('session-token', token, COOKIE_OPTIONS)
  return sendResponse(req, res, { data: { token } })
}

export async function signOut (req, res) {
  res.clearCookie('session-token')
  return sendResponse(req, res)
}
