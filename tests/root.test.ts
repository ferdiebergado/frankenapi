import request from 'supertest'
import app from '../src/app'

describe('GET /', () => {
  it('returns status up', async () => {
    const res = await request(app).get('/')

    expect(res.status).toEqual(200)
    expect(res.body.status).toEqual('up')
  })
})

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health')

    expect(res.status).toEqual(200)
    expect(res.body.status).toEqual('ok')
  })
})

describe('GET /notfound', () => {
  it('returns 404', async () => {
    const res = await request(app).get('/notfound')

    expect(res.status).toEqual(404)
  })
})
