import { Entity } from '../../lib/db'

export interface User extends Entity {
  email: string
  password: string
}

export type CreateUserDto = Pick<User, 'email' | 'password'>
