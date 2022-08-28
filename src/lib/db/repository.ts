import { Entity } from './entity'

export interface Repository<T extends Entity> {
  find: (id: number) => T | Promise<T>
  findAll: (limit: number, offset: number) => T[] | Promise<T[]>
  findBy: (fields: Partial<T>) => T[] | Promise<T[]>
  create: (entity: Partial<T>) => T | Promise<T>
  update: (id: number, updates: Partial<T>) => T | Promise<T>
  destroy: (id: number) => boolean | Promise<boolean>
}
