import {FluidValue, is, setHidden} from '../utils'
import {SynthedValue} from './SynthedValue'
import {SynthedValues} from './SynthedValues'

const $node: any = Symbol.for('Synthed:node')

let __nextId__ = 1

export abstract class Synthed <T = any> extends FluidValue{
    readonly id = __nextId__++
    // abstract key?: string

    abstract get (synthed?: boolean): T | undefined

    abstract set (...tags: any[]): this

    abstract reset (goal?: any): this
}

export const isSynthed = <T = any>(value: any): value is Synthed<T> =>
    !!value && value[$node] === value

export const getSynthed = <T = any>(owner: any): Synthed<T> | undefined =>
    owner && owner[$node]

export const setSynthed = <T = any>(owner: any, node: Synthed<T>) =>
    setHidden(owner, $node, node)

export const getSynthedType = (value: any) => {
    const parentNode = getSynthed(value)
    return parentNode
        ? (parentNode.constructor as any)
        : is.arr(value) || is.obj(value)
        ? SynthedValues
        : SynthedValue
}
