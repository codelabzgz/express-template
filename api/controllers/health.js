export async function ping (req, res) {
  res.status(200).send({ health: 'ok' })
}
