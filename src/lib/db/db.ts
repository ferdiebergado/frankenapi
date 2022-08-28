import { Pool, QueryConfig } from 'pg'
import config from '../../config'

const pool = new Pool(config.db)

console.log('Connected to the database')

export const query = async <T>(queryConfig: QueryConfig) => {
  const start = Date.now()
  const res = await pool.query<T>(queryConfig)
  const duration = Date.now() - start

  console.log('executed query:', {
    queryConfig,
    duration,
    rows: res.rowCount,
  })

  console.log(
    'Pool -> Total:',
    pool.totalCount,
    'Idle:',
    pool.idleCount,
    'Waiting:',
    pool.waitingCount
  )

  return res
}

export const getClient = async () => {
  return await pool.connect()
}

export const resetTable = async (table: string) => {
  const sql: QueryConfig = {
    text: `TRUNCATE ONLY ${table} RESTART IDENTITY`,
  }

  await query(sql)
}

export const close = async () => {
  await pool.end()
  console.log('Database closed')
}
