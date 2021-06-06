const $node: any = Symbol.for('Synthed:node')

export const isSynthed = <T = any>(node: any): node is Synthed<T> =>
    !!node && node[$node] === node

export abstract class Synthed <T = any>{
    abstract get(synthed?: boolean): T | undefined

    abstract set(ctx: AudioNode, ...tags: T[]): this

    abstract reset(goal?: T): this
}
