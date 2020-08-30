module.exports = {
  port: Number(process.env.PORT) || 8080,
  mongoUrl: process.env.MONGO_URL,
  env: process.env.NODE_ENV,
  jwtKey: process.env.JWT_KEY || 'secret',
}
