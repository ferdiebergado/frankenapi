import httpStatus from 'http-status'
import { HttpMessages } from './messages'

export class HttpError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(statusCode: number, message: string) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }

    this.name = 'HttpError'
    this.statusCode = statusCode
    this.isOperational = true
  }
}

export class NotFoundError extends HttpError {
  constructor(message = httpStatus[httpStatus.NOT_FOUND] as string) {
    super(httpStatus.NOT_FOUND, message)
    this.name = 'NotFoundError'
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message = httpStatus[httpStatus.UNPROCESSABLE_ENTITY] as string) {
    super(httpStatus.UNPROCESSABLE_ENTITY, message)
    this.name = 'UnprocessableEntityError'
  }
}

export class InternalServerError extends HttpError {
  constructor(
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR] as string
  ) {
    super(httpStatus.INTERNAL_SERVER_ERROR, message)
    this.isOperational = false
    this.name = 'InternalServerError'
  }
}

export class BadRequestError extends HttpError {
  constructor(message = httpStatus[httpStatus.BAD_REQUEST] as string) {
    super(httpStatus.BAD_REQUEST, message)
    this.name = 'BadRequestError'
  }
}

export class ValidationError extends UnprocessableEntityError {
  errors: Record<string, any>[]

  constructor(errors: Record<string, any>[]) {
    super(HttpMessages.INVALID_INPUT)
    this.name = 'ValidationError'
    this.errors = errors
  }
}
