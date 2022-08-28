export default {
  app: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  },

  db: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database:
      process.env.NODE_ENV === 'production' ? process.env.POSTGRES_DB : 'test',
  },

  cors: {
    origin: '*',
  },
}
