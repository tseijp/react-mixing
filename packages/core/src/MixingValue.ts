// ref
// https://developer.mozilla.org/ja/docs/Web/API/MixingSynthesis
import {is} from './utils'
import {raf} from 'rafz'
import {
    Lookup,
    MixingProps,
    MixingUpdate,
} from './types'
import {FrameValue} from './FrameValue'
import {Synthesis} from './Synthesis'

export class MixingValue <T extends Lookup = Lookup> extends FrameValue<T> {
    key?: string
    idle = false
    synthesis = new Synthesis()
    queue: MixingUpdate<T>[] = []
    defaultProps = {}

    readonly _state = {
        paused: false,
        pausedQueue: new Set(),
        resumeQueue: new Set(),
        timeouts: new Set()
    }

    protected _priority = 0
    protected _pendingCalls = new Set<any>()
    protected _lastToId = 0
    protected _lastCallId = 0
    protected _memoizedDuration = 0

    constructor (arg1: any, arg2: any) {
        super()
        if (!is.und(arg1) || !is.und(arg2)) {
            const props = is.obj(arg1)? {...arg1}: {...arg2, from: arg1}
            if (is.und(props.default))
                props.default = true
            this.start(props)
        }
    }

    advance () {}

    set () {
        raf.batchedUpdates(() => {
            this._stop()
            this._focus()
            this._set()
        })
        return this
    }

    pause () {
        return this
    }

    resume () {
        return this
    }

    //!
    finish () {
        const { to, config } = this.synthesis
        raf.batchedUpdates(() => {
            this._onStart()
            // if (!config.decay)
            //     this._set(to, false)
            this._stop()
        })
        return this
    }

    update (props: MixingUpdate<T>) {
        (this.queue || (this.queue = [])).push(props)
        return this
    }

    start (to?: T | MixingUpdate<T>, arg2?: MixingProps<T>) {
        let queue: MixingUpdate<T>[]
        if (!is.und(to))
            queue = [is.obj(to)? to: {...arg2, to}]
        else
            queue = (this.queue || (this.queue = []))
        return Promise.all(queue.map(props => this._update(props)))
    }

    stop (cancel=false) {
        return this
    }

    reset (reset=true) {
        return this
    }

    eventObserved(event: any) {
        if (event.type == 'change')
            this.start()
        else if (event.type == 'priority')
            this._priority = event.priority + 1
    }

    _set (...args: any) {}
    _stop (...args: any) {}
    _update (...args: any) {}
    _focus (...args: any) {}
    _onStart(...args: any) {}
    _onChange (...args: any) {}
}
