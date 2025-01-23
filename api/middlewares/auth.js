import { getSession } from "@auth/express"
 
export async function authenticatedUser(req, res, next) {
  const session = res.locals.session ?? (await getSession(req, authConfig))
  if (!session?.user) {
    res.redirect("/login")
  } else {
    next()
  }
}