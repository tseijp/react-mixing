import {is, setHidden} from '../utils'
import {SynthedNode} from './SynthedNode'
import {SynthedNodes} from './SynthedNodes'

const $node: any = Symbol.for('Synthed:node')

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
        ? SynthedNodes
        : SynthedNode
}

export abstract class Synthed <T = any>{
    abstract get (synthed?: boolean): T | undefined

    abstract set (...tags: any[]): this

    abstract reset (goal?: any): this
}
