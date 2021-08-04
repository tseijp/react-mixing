import { Config } from './Config'
import { Context } from './Context'
import { FluidValue } from './utils'
import { SynthedValue } from './nodes'

export class Synthesis<T = any> {
    idle = false
    paused = false
    timeouts = new Set()
    pauseQueue = new Set()
    resumeQueue = new Set()

    changed = false
    readonly values: SynthedValue[] = []
    readonly toValues: number[] | null = null
    readonly onValues: number[] = []

    to!: T | FluidValue<T>
    on!: T | FluidValue<T>
    config = new Config()
    context = new Context()
    immediate = false
}
