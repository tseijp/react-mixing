import {defineHidden} from '../utils'

const $node: any = Symbol.for('Synthed:node')

export const isSynthed = <T = any>(value: any): value is Synthed<T> =>
    !!value && value[$node] === value

export const getSynthed = <T = any>(owner: any): Synthed<T> | undefined =>
    owner && owner[$node]

export const setSynthed = <T = any>(owner: any, node: Synthed<T>) =>
    defineHidden(owner, $node, node)

export abstract class Synthed <T = any>{
    abstract get (synthed?: boolean): T | undefined

    abstract set (...tags: any[]): this

    abstract reset (goal?: any): this
}
