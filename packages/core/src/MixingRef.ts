import {each, is} from './utils'
import {Controller} from './Controller'
import {Lookup, ControllerUpdate} from './types'

export interface MixingRef<T extends Lookup = Lookup>{
    current: Controller<T>[]
    each (eachFn: {(ctrl: Controller): any}): this
    add (ctrl: Controller<T>): void
    del (ctrl: Controller<T>): void
    set (values: Partial<T>): this
    pause (keys: string | string[]): this
    resume (keys: string | string[]): this
    update(props: ControllerUpdate<T>): this
    start(): any
    stop(): this
    _getProps(
        arg: ControllerUpdate<T> | {
            (i: number, ctrl: Controller<T>): ControllerUpdate<T>
        },
        ctrl: Controller<T>,
        index: number
    ): ControllerUpdate<T>
}

export function MixingRef<T extends Lookup = Lookup>() {
    const current: Controller<T>[] = []
    const ref: MixingRef<T> = (props: any) => {
        const results: any[] = []
        each(current, (ctrl, i) => {
            if (is.und(props)) {
                results.push(ctrl.start())
            } else {
                const update = ref._getProps(props, ctrl, i)
                if (update) {
                  results.push(ctrl.start(update))
                }
            }
        })
        return results
    }
    ref.current = current

    ref.each = (eachFn) => {
        each(current, eachFn)
        return this
    }

    ref.add = (ctrl: Controller<T>) => {
        if (!current.includes(ctrl))
            current.push(ctrl)
    }

    ref.del = (ctrl: Controller<T>) => {
        const i = current.indexOf(ctrl)
        if (~i) current.splice(i, 1)
    }

    ref.set = (...args: any[]) => ref.each(ctrl => ctrl.set(...args))

    ref.pause = (...args: any[]) => ref.each(ctrl => ctrl.pause(...args))

    ref.resume = (...args: any[]) => ref.each(ctrl => ctrl.resume(...args))

    ref.start = (...args: any[]) => ref.each(ctrl => ctrl.start(...args))

    ref.stop = (...args: any[]) => ref.each(ctrl => ctrl.stop(...args))

    ref.update = (...args: any[]) => ref.each(ctrl => ctrl.update(...args))

    ref._getProps = (arg, ctrl, index) => {
        return typeof arg === "function"? arg(index, ctrl): arg
    }

    return ref
}
