import { NotFoundError, UnprocessableEntityError } from '../../lib/http'
import { UserMessages } from './user.messages'

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super(UserMessages.NOT_FOUND)
  }
}

export class UserAlreadyExistsError extends UnprocessableEntityError {
  constructor() {
    super(UserMessages.EXISTS)
  }
}
