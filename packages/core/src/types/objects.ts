import type {MixingValue} from '../MixingValue'
import type {SynthConfig} from '../SynthConfig'
import type {Lookup, Any, Readable} from './utils'

type FluidValue = any

export type MixingConfig = Partial<SynthConfig>

export interface AnimationResult<T extends Readable = any> {
    value: T extends Readable<infer U> ? U : never
    noop?: boolean
    finished?: boolean
    cancelled?: boolean
}

export type AsyncResult<T extends Readable = any> = Promise<AnimationResult<T>>

export type Mixingify<T> = Lookup<MixingValue | undefined> &
  { [P in keyof T]: T[P] | MixingValue<T[P]> }

export type MixingValues<T extends Lookup = any> = [T] extends [Any]
    ? Lookup<MixingValue | undefined> // Special case: "any"
    : { [P in keyof T]: MixingWrap<T[P]> }

type MixingWrap<T> = [
    Exclude<T, FluidValue>,
    Extract<T, readonly any[]> // Arrays are animated.
] extends [object | void, never]
    ? never // Object literals cannot be animated.
    : MixingValue<Exclude<T, FluidValue | void>> | Extract<T, void>
