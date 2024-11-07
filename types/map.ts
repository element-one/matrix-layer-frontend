export type ObjectKeys<T> = Array<keyof T>
export type ValueOf<T> = T[keyof T]
export type ObjectEntries<T> = Array<[keyof T, ValueOf<T>]>
