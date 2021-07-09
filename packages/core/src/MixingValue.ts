// ref
// https://developer.mozilla.org/ja/docs/Web/API/MixingSynthesis
import {
    MixingProps,
    MixingUpdate,
} from './types'
import {
    is,
    each,
    getFluidValue,
    FluidValue
} from './utils'
import {
    getSynthedType,
    getSynthed,
    setSynthed,
    Synthed
} from './nodes'
import {FrameValue} from './FrameValue'
import {Synthesis} from './Synthesis'

const initState = {
}

export class MixingValue <T extends any = any> extends FrameValue<T> {
    key?: string
    synthesis = new Synthesis()
    queue: MixingUpdate<T>[] = []
    defaultProps = {}

    readonly _state = initState

    constructor (arg1: any, arg2?: any) {
        super()
        if (!is.und(arg1) || !is.und(arg2)) {
            const to = is.obj(arg1)
                ? {...arg1}
                : {...arg2, from: arg1}
            this.start(to)
        }
    }

    set (value: T | FluidValue<T>) {
        this._stop()
        this._set(value)
    }

    advance () {
        let idle = false
        let changed = false

        let {synthesis: $} = this
        let {config, toValues} = $

        each($.values, (node, i) => {
            if (node.done) return

        })
    }

    pause () {
        return this._update({pause: true})
    }

    resume () {
        return this._update({pause: false})
    }

    reset () {
        return this._update({reset: true})
    }

    update (props: MixingUpdate<T>) {
        (this.queue || (this.queue = [])).push(props)
    }

    start (to?: MixingUpdate<T>, arg2?: MixingProps<T>) {
        const queue = is.und(to)
            ? (this.queue || (this.queue = []))
            : [is.obj(to)? to: {...arg2, to}]
        return Promise.all(queue.map(props => this._update(props)))
    }

    stop (cancel=false) {
        const synth = this.synthesis
        synth.pauseQueue.clear()
        synth.resumeQueue.clear()
        this._stop(synth.to, cancel)
    }

    protected _set (arg: T | FluidValue<T>): Synthed | undefined  {
        const value = getFluidValue(arg)
        if (is.und(value))
            return getSynthed(this)

        const oldNode = getSynthed(this)
        if (oldNode && is(value, oldNode.get())) return
        const nodeType = getSynthedType(value)
        if (!oldNode || oldNode.constructor != nodeType)
            setSynthed(this, nodeType.create(value))
        else
            oldNode?.set(value)
    }

    protected _start (...args: any) {
        const $ = this.synthesis
        getSynthed(this)!.reset(getFluidValue($.to))

    }

    protected _stop (...args: any) {
    }

    protected _focus (value: any) {
    }

    protected _prepare(props: any) {
        const key = this.key || ''
        let { to, from } = props

        from = is.obj(from)? from[key] : from
        to = is.obj(to)? to[key] : to
        if (from == null)
            from = undefined
        if (to == null || is.fun(to))
            to = undefined

        const range = { to, from }
        this._set(getSynthed(this)? to: from)
        return range
    }

    protected _update (props: MixingProps<T>) {
        const range = this._prepare(props)
        return new Promise(resolve => this._merge(range, props, resolve))
    }

    protected _merge (range: any, props: any, resolve: any) {
        if (props.cancel) {
            this.stop(true)
            return resolve({value: this, canceled: true, finished:false})
        }
        const { key, defaultProps, synthesis: $ } = this
        const { to: prevTo, from: prevFrom } = $
        let { to = prevTo, from = prevFrom } = range
        if (props.reverse) [to, from] = [from, to]

        from = getFluidValue(from)
        const isFromUndefined = is.und(prevFrom),
                isToUndefined = is.und(prevTo),
               hasFromChanged = !is(from, prevFrom),
                 hasToChanged = !is(to, prevTo)

        if (hasToChanged)
            this._focus(to)

        if (hasFromChanged)
            $.from = from
    }
}
