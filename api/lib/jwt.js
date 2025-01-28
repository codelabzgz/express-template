import { SignJWT } from 'jose'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY)

export async function createToken (payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(SECRET_KEY)
}

function fromCookie (req) {
  let token = null
  if (req && req.signedCookies) {
    token = req.signedCookies['session-token']
  }
  return token
};

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), fromCookie]),
  secretOrKey: SECRET_KEY
}

passport.use(new Strategy(options, async (jwtPayload, done) => {
  try {
    return done(null, jwtPayload)
  } catch (err) {
    console.error(err)
    return done(null, false, { message: 'Token inválido o expirado' })
  }
}))
