import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { ApiResponse } from '../../lib/http'
import { CreateUserDto, User } from './user.entity'
import { UserMessages } from './user.messages'
import { userService } from './user.service'

export const userController = {
  create: async (
    req: Request<any, any, User>,
    res: Response<ApiResponse>,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body

      const createUserDto: CreateUserDto = { email, password }

      const user = await userService.createUser(createUserDto)

      const response: ApiResponse = {
        ok: true,
        message: UserMessages.CREATED,
        data: { user },
      }

      res.status(httpStatus.CREATED).json(response)
    } catch (error) {
      next(error)
    }
  },
}
