import {getSynthed} from './nodes'
import {frameLoop, callFluidObservers} from './utils'

export const isFrameValue = (value: any): value is FrameValue =>
  value instanceof FrameValue

let nextId = 1

export abstract class FrameValue<T = any> {
    readonly id = nextId++

    abstract key?: string
    abstract get idle(): boolean

    protected _priority = 0

    get priority () {
        return this._priority
    }

    set priority (priority: number) {
        if (this._priority != priority) {
            this._priority = priority
            this._onPriorityChange(priority)
        }
    }

    get (): T {
        const node = getSynthed(this)
        return node?.get()
    }

    protected observerAdded(count: number) {
        if (count == 1) this._attach()
    }

    protected observerRemoved(count: number) {
        if (count == 0) this._detach()
    }

    abstract advance(dt: number): void

    abstract eventObserved(...args: any): void

    protected _attach() {}

    protected _detach() {}

    protected _onChange(value: T, idle = false) {
        callFluidObservers(this, {
            type: 'change',
            parent: this,
            value,
            idle,
        })
    }

    protected _onPriorityChange(priority: number) {
        if (!this.idle)
            frameLoop.sort(this)
        callFluidObservers(this, {
            type: 'priority',
            parent: this,
            priority,
        })
    }
}
