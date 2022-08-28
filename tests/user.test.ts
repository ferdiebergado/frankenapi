import request from 'supertest'
import { faker } from '@faker-js/faker'
import httpStatus from 'http-status'
import app from '../src/app'
import { CreateUserDto, User, UserMessages } from '../src/resources/user'
import { resetTable } from '../src/lib/db'
import { HttpMessages } from '../src/lib/http'

const url = '/users'
const jsonHeaderName = 'Content-Type'
const jsonHeaderValue = 'application/json'

const getData = () => {
  return {
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(10),
  }
}

const postData = async (
  api: request.SuperTest<request.Test>,
  url: string,
  data: Record<string, any>
): Promise<request.Response> => {
  return await api.post(url).set(jsonHeaderName, jsonHeaderValue).send(data)
}

describe('User Management Test Suite', () => {
  describe('POST /users', () => {
    let api: request.SuperTest<request.Test>
    let data: CreateUserDto

    beforeEach(() => {
      api = request(app)
      data = getData()
    })

    afterAll(async () => {
      await resetTable('users')
    })

    it('creates a new user', async () => {
      const response = await postData(api, url, data)

      expect(response.statusCode).toEqual(httpStatus.CREATED)
      expect(response.body.ok).toEqual(true)
      expect(response.body.message).toEqual(UserMessages.CREATED)
      expect(response.body.data.user).toMatchObject<Omit<User, 'password'>>({
        id: expect.any(Number),
        email: data.email,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    })

    it('fails when user already exists', async () => {
      let response = await postData(api, url, data)

      response = await postData(api, url, data)

      expect(response.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY)
      expect(response.body.ok).toEqual(false)
      expect(response.body.message).toEqual(UserMessages.EXISTS)
    })

    it('fails when email is empty', async () => {
      const response = await postData(api, url, { password: data.password })

      expect(response.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY)
      expect(response.body.ok).toEqual(false)
      expect(response.body.message).toEqual(HttpMessages.INVALID_INPUT)
      expect(response.body.errors[0].param).toEqual('email')
      expect(response.body.errors[0].msg).toEqual(UserMessages.EMAIL_REQUIRED)
    })

    it('fails when email is not a valid email', async () => {
      const response = await postData(api, url, {
        ...data,
        email: 'notanemail',
      })

      expect(response.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY)
      expect(response.body.ok).toEqual(false)
      expect(response.body.message).toEqual(HttpMessages.INVALID_INPUT)
      expect(response.body.errors[0].param).toEqual('email')
      expect(response.body.errors[0].msg).toEqual(UserMessages.INVALID_EMAIL)
    })

    it('fails when password is empty', async () => {
      const response = await postData(api, url, { email: data.email })

      expect(response.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY)
      expect(response.body.ok).toEqual(false)
      expect(response.body.message).toEqual(HttpMessages.INVALID_INPUT)
      expect(response.body.errors[0].param).toEqual('password')
      expect(response.body.errors[0].msg).toEqual(
        UserMessages.PASSWORD_REQUIRED
      )
    })
  })

  describe('GET /users/:id', () => {
    it.todo('returns the user with the specified id')
    it.todo('returns 404 when user with the specified id does not exists')
  })

  describe('PATCH /users/:id', () => {
    it.todo('updates the password of the user with the specified id')
    it.todo('fails when the new password is empty')
    it.todo('fails when the password confirmation is empty')
    it.todo('fails when the passwords do not match')
    it.todo('returns 404 when user with the specified id does not exists')
  })

  describe('DELETE /users/:id', () => {
    it.todo('deletes the user with the specified id')
    it.todo('returns 404 when user with the specified id does not exists')
  })
})
