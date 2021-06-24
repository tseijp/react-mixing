// ref
// https://github.com/pmndrs/react-spring/blob/master/packages/shared/src/helpers.ts

type EachFn<Value, Key, This> = (this: This, value: Value, key: Key) => void

type Eachable<Value = any, Key = any, This = any> = {
    forEach(cb: EachFn<Value, Key, This>, ctx?: This): void
}

export const each = <Value, Key, This>(
    obj: Eachable<Value, Key, This>,
    fn: EachFn<Value, Key, This>
) => obj.forEach(fn)

export function eachProp<T extends object, This>(
  obj: T,
  fn: EachFn<T extends any[]? T[number]: T[keyof T], string, This>,
  ctx?: This
) {
    for (const key in obj)
        fn.call(ctx as any, obj[key] as any, key)
}

export function flush<P, T>(queue: Map<P, T>, iterator: (entry: [P, T]) => void): void

export function flush<T>(queue: Set<T>, iterator: (value: T) => void): void

export function flush(queue: any, iterator: any) {
    if (queue.size) {
        const items = Array.from(queue)
        queue.clear()
        each(items, iterator)
    }
}

type PlainObject<T = any> = Exclude<T & {[key: string]: any}, Function | readonly any[]>

const is = (a: any, b?: any, ...other: any): boolean => {
    if (other.length > 0) return is(a, b) && is(b, ...other)
    if (typeof a !== typeof b) return false
    if (is.str(a) || is.num(a)) return a === b
    for (let i in a) if (!(i in b)) return false
    for (let i in b) if (a[i] !== b[i]) return false
    return true
}

is.arr = Array.isArray
is.fls = (a: unknown): a is false => is.und(a) || is.nul(a) || a === false || a === ''
is.nul = (a: unknown): a is null => a === null
is.und = (a: unknown): a is undefined => a === void 0
is.num = (a: unknown): a is number => typeof a === 'number'
is.str = (a: unknown): a is string => typeof a === 'string'
is.fun = (a: unknown): a is Function => typeof a === 'function'
is.obj = <T = any>(a: T & any): a is PlainObject<T> => !!a && a.constructor.name === 'Object',
is.url = (a: unknown): a is URL => a instanceof URL
is.set = (a: unknown): a is Set<any> => a instanceof Set
is.map = (a: unknown): a is Map<any, any> => a instanceof Map
is.big = (a: unknown): a is string => is.str(a) && a === a.toUpperCase()
is.len = (l: number, a: any): a is string | any[] => (is.arr(a) || is.str(a)) && a.length === l

export  { is }
