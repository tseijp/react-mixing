import {setHidden} from '../utils'

const $node: any = Symbol.for('Synthed:node')

let __nextId__ = 1

export abstract class Synthed <T = any> {
    readonly id = __nextId__++

    abstract get (synthed?: boolean): T | undefined

    abstract set (...tags: any[]): this

    abstract reset (goal?: any): this
}

export function isSynthed <T = any>(value: any): value is Synthed<T>

export function isSynthed (value: any) {
    return !!value && value[$node] === value
}

export function getSynthed <T = any>(owner: any): Synthed<T> | undefined

export function getSynthed (owner: any) {
    return owner && owner[$node]
}

export function setSynthed <T = any>(owner: any, node: Synthed<T>): void

export function setSynthed (owner: any, node: any) {
    setHidden(owner, $node, node)
}
