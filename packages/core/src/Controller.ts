let nextId = 1
import {raf} from 'rafz'
import {MixingValue} from './MixingValue'
import {MixingRef} from './MixingRef'
import {is, each, eachProp, flush} from './utils'
import {
    Lookup,
    InferState,
    AsyncResult,
    UnknownProps,
    MixingValues,
    ControllerUpdate,
} from './types'

const concat = Array.prototype.concat

export type ControllerFlushFn<T extends Controller<any> = Controller> = (
    ctrl: T,
    queue: ControllerQueue<InferState<T>>
) => AsyncResult<T>

export interface ControllerQueue<State extends Lookup = Lookup>
    extends Array<
        ControllerUpdate<State, any> & { keys: string[] | null }
    > {}

export class Controller<T extends Lookup = Lookup> {
    readonly id = nextId++
    mixings: MixingValues = {}
    ref?: MixingRef
    queue: any = []

    private _flush?: ControllerFlushFn<this>
    private _lastAsyncId = 0
    private _active = new Set<MixingValue>()
    private _changed = new Set<MixingValue>()
    private _started = false
    private _item?: any
    private _state = {
        paused: false,
        pauseQueue: new Set(),
        resumeQueue: new Set(),
        timeouts: new Set(),
    }
    private _events = {
        onStart: new Map<any, any>(),
        onChange: new Map<any, any>(),
        onRest: new Map<any, any>()
    }

    constructor(props: any, flush?: any) {
        this._onFrame = this._onFrame.bind(this)
        if (flush)
            this._flush = flush
        if (props)
            this.start({default: true, ...props})
    }

    get item () {
        return this._item
    }

    get (): T & UnknownProps {
        const values: any = {}
        eachProp(this.mixings, (mixing, key) => (values[key] = mixing?.get()))
        return values
    }

    set (values: Partial<T>) {
        eachProp(values, (value, key) => {
            if (!is.und(value))
                this.mixings[key]?.set(value)
        })
    }

    each (eachFn=()=>{}) {
        each(this.queue, eachFn)
        return this
    }

    resume (keys?: string | string[]) {
        if (is.und(keys))
            this.start({pause: false})
    }

    pause (...args: any) {}

    start (props?: ControllerUpdate<T> | null) {
        let {queue} = this as any
        if (props)
            queue = concat(props)//.map(createUpdate)
        else
            this.queue = []

        if (this._flush)
            return this._flush(this, queue)

        prepareKeys(this, queue)
        return flushUpdateQueue(this, queue)
    }

    stop (arg?: boolean, keys?: string | string[]) {
        if (arg !== !!arg)
            keys = arg as stirng | string[]
        if (keys)
            each(concat(keys), key => this.mixings[key].pause())
        else
            stopAsync(this._state, this._lastAsyncId)
            each(this.mixings, mixing => mixing.stop(!!arg))
    }

    update (props?: ControllerUpdate<T> | null) {
        if (props)
            this.queue.push(createUpdate(props))
    }

    _onFrame () {
        const {onStart, onChange, onRest} = this._events
        const active = this._active.size > 0
        const changed = this._changed.size > 0
        const idle = !active && this._started
        const values = changed || (idle && onRest.size)? this.get(): null

        if ((active && !this._started) || (changed && !this._started)) {
            this._started = true
            flush (onStart, ([onStart, result]) => {
                result.value = this.get()
                onStart(result, this, this._item)
            })
        }

        if (changed && onChange.size) {
            flush(onChange, ([onChange, result]) => {
                result.value = this.get()
                onChange(result, this, this._item)
            })
        }

        if (idle) {
            this._started = false
            flush(onRest, ([onRest, result]) => {
                result.value = values
                onRest(result,this, this._item)
            })
        }
    }

    eventObserved (event: any) {// MixingValue.Event) {
        if (event.type == 'change') {
            this._changed.add(event.parent)
            if (!event.idle)
                this._active.add(event.parent)
        } else if (event.type == 'idle') {
            this._active.delete(event.parent)
        } else return
        raf.onFrame(this._onFrame)
    }
}
