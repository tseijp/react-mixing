import {MixingRef} from '../MixingRef'
import {Config} from '../Config'
import {Controller} from '../Controller'
import {FluidValue, FluidProps} from '../utils'
import {
    Any,
    Falsy,
    Lookup,
    OneOrMore,
    StringKeys,
    UnknownProps,
    IsPlainObject,
} from './utils'

type MixingToFn<T=any> = T

export type MixingUpdate<T = any> = ToProps<T> & MixingProps<T>

export type MixingsUpdate<State extends Lookup = UnknownProps> =
  | OneOrMore<ControllerUpdate<State>>
  | ((index: number, ctrl: Controller<State>) => ControllerUpdate<State> | null)

export interface MixingProps<T = any> extends SynthesisProps<T> {
    from?: GoalValue<T>
    loop?: LoopProp<MixingUpdate>
    onProps?: (...args: any[]) => any
    onStart?: (...args: any[]) => any
    onChange?: (...args: any[]) => any
    onPause?: (...args: any[]) => any
    onResume?: (...args: any[]) => any
    onRest?: (...args: any[]) => any
}

export type ToProps<T = any> =
    | { to?: GoalProp<T> | MixingToFn<T> | MixingChain<T> }
    | ([T] extends [IsPlainObject<T>] ? InlineToProps<T> : never)

export type GoalProp<T> = [T] extends [IsPlainObject<T>]
    ? GoalValues<T> | Falsy
    : GoalValue<T>

export type GoalValues<T extends Lookup> = FluidProps<T> extends infer Props
    ? { [P in keyof Props]?: Props[P] | null }
    : never

export type GoalValue<T> = T | FluidValue<T> | UnknownProps | null | undefined

export type InlineToProps<T = any> = Remap<GoalValues<T> & { to?: undefined }>

export interface MixingChain<T = any>
  extends Array<
    [T] extends [IsPlainObject<T>]
      ? ControllerUpdate<T>
      : MixingTo<T> | MixingUpdate<T>
  > {}

export type MixingTo<T = any> =
    | ([T] extends [IsPlainObject<T>] ? never : T | FluidValue<T>)
    | MixingChain<T>
    | MixingToFn<T>
    | Falsy

export type ControllerUpdate<
    State extends Lookup = Lookup,
    Item = undefined
> = unknown & ToProps<State> & ControllerProps<State, Item>

export interface ControllerProps<
    State extends Lookup = Lookup,
    Item = undefined
> extends MixingProps<State> {
    ref?: MixingRef<State>
    from?: GoalValues<State> | Falsy
    loop?: LoopProp<ControllerUpdate>
    onStart?: (...args: any[]) => any
    onRest?: (...args: any[]) => any
    onChange?: (...args: any[]) => any
    onPause?: (...args: any[]) => any
    onResume?: (...args: any[]) => any
    onProps?: (...args: any[]) => any
    onResolve?: (...args: any[]) => any
}

export type LoopProp<T extends object> = boolean | T | (() => boolean | T)

export type VelocityProp<T = any> = T extends ReadonlyArray<number | string>
  ? number[]
  : number

export interface SynthesisProps<T = any> {
    config?: Config | ((key: StringKeys<T>) => Config)
    delay?: number | ((key: StringKeys<T>) => Config)
    immeduate?: boolean
    cancel?: boolean
    pause?: boolean
    reset?: boolean
    reverse?: boolean
}

export interface ReservedProps extends ReservedEventProps {
    config?: any
    from?: any
    to?: any
    ref?: any
    loop?: any
    pause?: any
    reset?: any
    cancel?: any
    reverse?: any
    immediate?: any
    default?: any
    delay?: any
    // Transition props
    items?: any
    trail?: any
    sort?: any
    expires?: any
    initial?: any
    enter?: any
    update?: any
    leave?: any
    children?: any
    // Internal props
    keys?: any
    callId?: any
    parentId?: any
}

export interface ReservedEventProps {
    onProps?: any
    onStart?: any
    onChange?: any
    onPause?: any
    onResume?: any
    onRest?: any
    onResolve?: any
    onDestroyed?: any
}

export type PickSynthed<Props extends object, Fwd = true> = unknown &
  ([Props] extends [Any]
    ? Lookup
    : [object] extends [Props]
    ? Lookup
    : ObjectFromUnion<
        Props extends { from: infer From }
          ? ObjectType<From>
          : TransitionKey & keyof Props extends never
          ? ToValues<Props, Fwd>
          : TransitionValues<Props>
      >)

type ToValues<Props extends object, AndForward = true> = unknown &
    (AndForward extends true ? ForwardProps<Props> : unknown) &
    (Props extends { to?: any }
        ? Exclude<Props['to'], Function | ReadonlyArray<any>> extends infer To
            ? ForwardProps<[To] extends [object] ? To : Partial<Extract<To, object>>>
            : never
        : unknown)

export interface SpringToFn<T = any> {
  (start: StartFn<T>, stop: StopFn<T>): Promise<any> | void
}

type StartFn<T> = InferTarget<T> extends { start: infer T } ? T : never
type StopFn<T> = InferTarget<T> extends { stop: infer T } ? T : never
