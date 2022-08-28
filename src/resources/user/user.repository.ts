import { QueryConfig } from 'pg'
import { User } from '.'
import { query } from '../../lib/db'
import { CreateUserDto } from './user.entity'

export const userRepository = {
  create: async (user: CreateUserDto) => {
    const sqlCreateUser: QueryConfig = {
      name: 'create-user',
      text: 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      values: [user.email, user.password],
    }

    const { rows } = await query<User>(sqlCreateUser)

    return rows[0]
  },

  find: async (id: number) => {
    const sqlFindUser: QueryConfig = {
      name: 'find-user',
      text: 'SELECT * FROM users WHERE id = $1 LIMIT 1',
      values: [id],
    }

    const { rows } = await query<User>(sqlFindUser)

    return rows[0]
  },

  findByEmail: async (email: string) => {
    const sqlFindUserByEmail: QueryConfig = {
      name: 'find-user-email',
      text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
      values: [email],
    }

    const { rows } = await query<User>(sqlFindUserByEmail)

    return rows[0]
  },
}
