import argon from 'argon2'
import { CreateUserDto } from './user.entity'
import { UserAlreadyExistsError } from './user.errors'
import { userRepository } from './user.repository'

export const userService = {
  createUser: async (user: CreateUserDto) => {
    const exists = await userRepository.findByEmail(user.email)

    if (exists) throw new UserAlreadyExistsError()

    user.password = await argon.hash(user.password)

    const { password, ...created } = await userRepository.create(user)

    return created
  },
}
