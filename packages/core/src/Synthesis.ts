import { Config } from './Config'
import { Context } from './Context'
import { SynthedValue } from './nodes'

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
    context = new Context()
    immediate = false
}
