import type { ObjectEntries, ObjectKeys } from '@type/map'

export function objectKeys<T extends object>(object: T): ObjectKeys<T> {
  return Object.keys(object) as ObjectKeys<T>
}

export function objectEntries<T extends object>(object: T): ObjectEntries<T> {
  return Object.entries(object) as ObjectEntries<T>
}
