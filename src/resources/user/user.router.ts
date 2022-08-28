import express from 'express'
import { body } from 'express-validator'
import { userController, UserMessages } from '.'
import { validate } from '../../lib/middlewares'

export const userRouter = express.Router()

userRouter.post(
  '/',
  validate([
    body('email')
      .notEmpty()
      .withMessage(UserMessages.EMAIL_REQUIRED)
      .isEmail()
      .withMessage(UserMessages.INVALID_EMAIL),
    body('password')
      .notEmpty()
      .withMessage(UserMessages.PASSWORD_REQUIRED)
      .trim()
      .escape(),
  ]),
  userController.create
)
