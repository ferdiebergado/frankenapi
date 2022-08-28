import { close } from './src/lib/db'

jest.setTimeout(10000)

afterAll(async () => {
  await close()
})
