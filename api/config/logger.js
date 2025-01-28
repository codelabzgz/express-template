/** @type {import('pino-http').Options} */
export const loggerHttp = {
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l'
    }
  },
  autoLogging: {
    ignore: (req) => req.url === '/favicon.ico'
  },
  customSuccessMessage: (req, res, responseTime) => {
    const method = req.method.padEnd(6)
    const url = req.url.padEnd(45)
    const status = `${res.statusCode}`.padStart(4)
    const time = `${responseTime.toFixed(2)} ms`

    return `${method} ${url} ${status} ${time}`
  },
  customErrorMessage: (req, res, err, responseTime) => {
    const method = req.method.padEnd(6)
    const url = req.url.padEnd(45)
    const status = `${res.statusCode}`.padStart(5)
    const time = `${responseTime.toFixed(2)} ms`

    return `${method} ${url} ${status} ${time}`
  },
  customProps: (req, res, err, responseTime) => ({}),
  serializers: {
    req: () => undefined,
    res: () => undefined,
    err: () => undefined,
    responseTime: () => undefined
  }
}
