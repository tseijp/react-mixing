import {Controller} from '../Controller'
import {MixingValue} from '../MixingValue'

export class Any {private _: any}

export interface Lookup<T = any> {
  [key: string]: T
}

export type UnknownProps = any

export type Falsy = false | null | undefined

export type OneOrMore<T = any> = T | T[]

export type IsPlainObject<T> = T extends ReadonlyArray<any>
    ? Any
    : T extends object
    ? object
    : Any

export interface Readable<T = any> {
    get(): T
}

export type NoInfer<T> = [T][T extends any ? 0 : never]

export type InferState<T extends Readable> = T extends Controller<infer State>
  ? State
  : T extends MixingValue<infer U>
  ? U
  : unknown

export type InferTarget<T> = T extends object
    ? T extends ReadonlyArray<number | string>
        ? MixingValue<T>
        : Controller<T>
    : MixingValue<T>
