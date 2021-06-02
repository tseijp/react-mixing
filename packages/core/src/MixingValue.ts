// ref
// https://developer.mozilla.org/ja/docs/Web/API/MixingSynthesis
import {is} from './utils'
import {raf} from 'rafz'
import {Synth} from './Synth'
import {SynthValue} from './SynthValue'
import {
    Lookup,
    MixingProps,
    MixingUpdate,
} from './types'

export class MixingValue <T extends Lookup = Lookup> extends SynthValue<T> {
    key?: string
    synth = new Synth()
    queue: MixingUpdate<T>[] = []
    defaultProps = {}
    readonly _state = {
        paused: false,
        pausedQueue: new Set(),
        resumeQueue: new Set(),
        timeouts: new Set()
    }
    readonly _pendingCalls = new Set<any>()
    readonly _priority = 0
    readonly _lastToId = 0
    readonly _lastCallId = 0
    readonly _memoizedDuration = 0

    constructor (arg1: any, arg2: any) {
        super()
        if (!is.und(arg1) || !is.und(arg2)) {
            const props = is.obj(arg1)? {...arg1}: {...arg2, from: arg1}
            if (is.und(props.default))
                props.default = true
            this.start(props)
        }
    }
    // get goal (): T {return}
    // get velocity () {return}

    advance () {
        let idle = true
        let changed = false
        // const  = this.esis
        // let {config, toValues} =
    }

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
        const { to, config } = this.synth
        raf.batchedUpdates(() => {
            this._onStart()
            if (!config.decay)
                this._set(to, false)
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
    }

    reset (reset=true) {
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
