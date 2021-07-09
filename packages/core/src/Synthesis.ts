import { SynthedValue } from './nodes'
import { Config } from './Config'

export class Synthesis<T = any> {
    idle = false
    paused = false
    timeouts = new Set()
    pauseQueue = new Set()
    resumeQueue = new Set()

    changed = false
    readonly values: SynthedValue[] = []
    readonly toValues: SynthedValue[] | null = null
    readonly fromValues: SynthedValue[] = []

    to!: T
    from!: T
    config = new Config()
    immediate = false
}
