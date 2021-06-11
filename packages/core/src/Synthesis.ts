import { SynthedNode } from './nodes'
import { Config } from './Config'

const emptyArray: readonly any[] = []

export class Synthesis<T = any> {
    changed = false
    values: readonly SynthedNode[] = emptyArray
    toValues: readonly number[] | null = null
    fromValues: readonly number[] = emptyArray

    to!: T
    from!: T
    config = new Config()
    immediate = false
}
