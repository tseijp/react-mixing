import {getSynthed} from './nodes'
import {FluidValue} from './utils'

export const isFrameValue = (value: any): value is FrameValue =>
  value instanceof FrameValue

let nextId = 1

export abstract class FrameValue<T = any> extends FluidValue {
    readonly id = nextId++

    abstract key?: string

    protected _priority = 0

    get priority () {
        return this._priority
    }

    set priority (priority: number) {
        if (this._priority != priority)
            this._priority = priority
    }

    get (): T {
        const node = getSynthed(this)
        return node?.get()
    }

    abstract advance(dt: number): void
}
