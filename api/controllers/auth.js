export async function signIn(req, res) {
  try {
    await signIn(req, res);
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send("Sign in failed");
  }
}

export async function signOut(req, res) {
  try {
    await signOut(req, res);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Sign out failed");
  }
}

export async function signUp(req, res) {
  res.status(200);
}
